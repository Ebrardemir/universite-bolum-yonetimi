package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoOturmaDuzeniOgrenciList;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoOturmaDuzeniIU;
import com.ogrenci_bilgi_sistemi.entities.*;
import com.ogrenci_bilgi_sistemi.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.services.Iservices.IOturmaDuzeniService;

@Service
public class OturmaDuzeniServiceImpl implements IOturmaDuzeniService {

    @Autowired
    private OgrenciDersRepository ogrenciDersRepository;

    @Autowired
    private OturmaDuzeniRepository oturmaDuzeniRepository;

    @Autowired
    private SinavRepository sinavRepository;

    @Autowired
    private DersRepository dersRepository;

    @Autowired
    private OgrenciRepository ogrenciRepository;

    @Autowired
    private DerslikRepository derslikRepository;

    @Override
    public void oturmaDuzeniOlustur(Integer sinavId) {
        // 1️⃣ Zaten var mı kontrol et
        boolean varMi = oturmaDuzeniRepository.existsBySinavId(sinavId);
        if (varMi) {
            throw new RuntimeException("Bu sınav için oturma düzeni zaten oluşturulmuş!");
        }

        // 2️⃣ Sınav ve derslikler
        sinav sinav = sinavRepository.findById(sinavId)
                .orElseThrow(() -> new IllegalArgumentException("Sınav bulunamadı: " + sinavId));
        Integer dersId = sinav.getDersId();
        List<Integer> ogrenciIdList = ogrenciDersRepository.findOgrenciIdByDersId(dersId);
        Collections.shuffle(ogrenciIdList);
        List<derslik> derslikler = sinav.getDerslikler();

        if (derslikler.isEmpty()) {
            throw new RuntimeException("Sınav için atanan derslik yok!");
        }

        int toplamOgrenci = ogrenciIdList.size();
        int toplamKapasite = derslikler.stream().mapToInt(d -> d.getKapasite()).sum();
        if (toplamOgrenci > toplamKapasite) {
            throw new RuntimeException("Yetersiz kapasite! Atanamayan öğrenci sayısı: " + (toplamOgrenci - toplamKapasite));
        }

        int derslikSayisi = derslikler.size();
        int[] hedefler = new int[derslikSayisi];
        double[] kesirler = new double[derslikSayisi];

        int toplamAtanan = 0;

        // 3️⃣ Oranlı floor + kesir
        for (int i = 0; i < derslikSayisi; i++) {
            double oran = (double) derslikler.get(i).getKapasite() / toplamKapasite;
            double hedef = oran * toplamOgrenci;
            hedefler[i] = (int) Math.floor(hedef);
            kesirler[i] = hedef - hedefler[i];
            toplamAtanan += hedefler[i];
        }

        // 4️⃣ Kalanları kesire göre ekle
        int kalan = toplamOgrenci - toplamAtanan;
        List<Integer> indexler = new ArrayList<>();
        for (int i = 0; i < derslikSayisi; i++) indexler.add(i);
        indexler.sort((a, b) -> Double.compare(kesirler[b], kesirler[a]));

        int idx = 0;
        while (kalan > 0) {
            int derslikIndex = indexler.get(idx % derslikSayisi);
            if (hedefler[derslikIndex] < derslikler.get(derslikIndex).getKapasite()) {
                hedefler[derslikIndex]++;
                kalan--;
            }
            idx++;
        }

        // 5️⃣ Dağıt ve kaydet — önce tek sıralar, dolunca çift sıralara geç
        int ogrIndex = 0;
        for (int i = 0; i < derslikSayisi; i++) {
            derslik d = derslikler.get(i);
            int kapasite = d.getKapasite();
            int ogrSayisi = Math.min(hedefler[i], kapasite);

            List<Integer> siraListesi = new ArrayList<>();
            // Tek numaralar
            for (int s = 1; s <= kapasite; s += 2) {
                siraListesi.add(s);
            }
            // Çift numaralar
            for (int s = 2; s <= kapasite; s += 2) {
                siraListesi.add(s);
            }

            if (siraListesi.size() < ogrSayisi) {
                throw new RuntimeException("Yetersiz sıra! Derslik kapasitesi yetmiyor.");
            }

            for (int j = 0; j < ogrSayisi && ogrIndex < toplamOgrenci; j++) {
                oturma_duzeni od = new oturma_duzeni();
                od.setSinavId(sinavId);
                od.setDerslikId(d.getId());
                od.setSiraNo(siraListesi.get(j)); // 🔑 akıllı sıra no
                od.setOgrenciId(ogrenciIdList.get(ogrIndex++));
                oturmaDuzeniRepository.save(od);
            }
        }

        if (ogrIndex < toplamOgrenci) {
            throw new RuntimeException("Yetersiz kapasite! Atanamayan öğrenci sayısı: " + (toplamOgrenci - ogrIndex));
        }
    }







    @Override
    public List<DtoOturmaDuzeniOgrenciList> oturmaDuzeniGetirList(Integer sinavId) {
        // 1) Oturma düzeni kayıtlarını çek
        List<oturma_duzeni> duzenList = oturmaDuzeniRepository.findBySinavId(sinavId);

        List<DtoOturmaDuzeniOgrenciList> dtoList = new ArrayList<>();

        // 2) Sınavı getir (ders için)
        sinav sinav = sinavRepository.findById(sinavId)
                .orElseThrow(() -> new RuntimeException("Sınav bulunamadı: " + sinavId));

        // 3) Sınavın dersini getir
        Ders ders = dersRepository.findById(sinav.getDersId())
                .orElseThrow(() -> new RuntimeException("Ders bulunamadı: " + sinav.getDersId()));

        // 4) Her oturma düzeni için DTO hazırla
        for (oturma_duzeni od : duzenList) {
            // Öğrenciyi getir
            Ogrenci ogrenci = ogrenciRepository.findById(od.getOgrenciId())
                    .orElseThrow(() -> new RuntimeException("Öğrenci bulunamadı: " + od.getOgrenciId()));

            // Dersliği getir
            derslik derslik = derslikRepository.findById(od.getDerslikId())
                    .orElseThrow(() -> new RuntimeException("Derslik bulunamadı: " + od.getDerslikId()));

            // DTO oluştur
            DtoOturmaDuzeniOgrenciList dto = new DtoOturmaDuzeniOgrenciList();
            dto.setId(od.getId());
            dto.setSinavId(od.getSinavId());
            dto.setDerslikId(od.getDerslikId());
            dto.setSiraNo(od.getSiraNo());
            dto.setOgrenciId(od.getOgrenciId());
            dto.setOgreniIsim(ogrenci.getIsim());
            dto.setOgrenciSoyadi(ogrenci.getSoyisim());
            dto.setDerslikAdi(derslik.getDerslikAdi()); // ✅ senin entity'de 'derslikAdi' alanı olmalı
            dto.setSinavDersAdi(ders.getDersAdi());

            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    @Transactional
    public List<DtoOturmaDuzeniOgrenciList> oturmaDuzeniGuncelle(List<DtoOturmaDuzeniIU> dtoOturmaDuzeniIUS) {
        List<oturma_duzeni> updatedEntities = new ArrayList<>();

        for (DtoOturmaDuzeniIU dto : dtoOturmaDuzeniIUS) {
            List<oturma_duzeni> existingList = oturmaDuzeniRepository.findByOgrenciId(dto.getOgrenciId());

            if (!existingList.isEmpty()) {
                // İlk kaydı güncelle
                oturma_duzeni entity = existingList.get(0);
                entity.setDerslikId(dto.getDerslikId());
                entity.setSiraNo(dto.getSiraNo());
                updatedEntities.add(entity);
            } else {
                oturma_duzeni entity = new oturma_duzeni();
                entity.setOgrenciId(dto.getOgrenciId());
                entity.setDerslikId(dto.getDerslikId());
                entity.setSiraNo(dto.getSiraNo());
                updatedEntities.add(entity);
            }
        }

        List<oturma_duzeni> saved = oturmaDuzeniRepository.saveAll(updatedEntities);

        return saved.stream()
                .map(entity -> {
                    DtoOturmaDuzeniOgrenciList dto = new DtoOturmaDuzeniOgrenciList();
                    org.springframework.beans.BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }





}
