package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinav;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavIU;
import com.ogrenci_bilgi_sistemi.entities.derslik;
import com.ogrenci_bilgi_sistemi.entities.sinav;
import com.ogrenci_bilgi_sistemi.repository.DerslikRepository;
import com.ogrenci_bilgi_sistemi.repository.OgrenciDersRepository;
import com.ogrenci_bilgi_sistemi.repository.SinavRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.ISinavService;

import jakarta.transaction.Transactional;

@Service
public class SinavServiceImpl implements ISinavService {

    @Autowired
    private SinavRepository sinavRepository;

    @Autowired
    private DerslikRepository derslikRepository;

    @Autowired
    private OgrenciDersRepository ogrenciDersRepository;

    @Override
    @Transactional
    public List<DtoSinav> sinavSave(List<DtoSinavIU> sinavList) {
        if (sinavList == null || sinavList.isEmpty()) {
            throw new IllegalArgumentException("Sınav listesi boş olamaz.");
        }

        Integer sinavId = sinavList.get(0).getSinavId();

        // 1. Aynı sinavId'ye ait eski sınavları sil
        sinavRepository.deleteBySinavId(sinavId);

        // 2. Yeni sınavları kontrol et ve kaydet
        List<DtoSinav> dtoSinavList = new ArrayList<>();

        for (DtoSinavIU dto : sinavList) {

            // 2.1 Çakışma Kontrolleri
            for (Integer derslikId : dto.getDerslikIdList()) {
                boolean derslikCakisiyor = sinavRepository.existsByDerslikIdAndSinavTarihAndSaatAralik(
                        derslikId, dto.getSinavTarih(), dto.getBaslangicSaati(), dto.getBitisSaati());

                if (derslikCakisiyor) {
                    throw new IllegalArgumentException("Derslik ID " + derslikId + " bu saatte başka sınav için kullanılıyor!");
                }
            }

            boolean gozetmenCakisiyor = sinavRepository.existsByGozetmenIdAndSinavTarihAndSaatAralik(
                    dto.getGozetmenId(), dto.getSinavTarih(), dto.getBaslangicSaati(), dto.getBitisSaati());

            if (gozetmenCakisiyor) {
                throw new IllegalArgumentException("Gözetmen bu saatte başka sınavda görevli!");
            }

            // 2.2 Derslikleri Getir
            List<derslik> derslikler = dto.getDerslikIdList().stream()
                    .map(id -> derslikRepository.findById(id)
                            .orElseThrow(() -> new IllegalArgumentException("Derslik bulunamadı: " + id)))
                    .collect(Collectors.toList());

            // 2.3 Kapasite Kontrolü
            int toplamKapasite = derslikler.stream()
                    .mapToInt(d -> d.getSinavKapasite())
                    .sum();

            int ogrenciSayisi = ogrenciDersRepository.findOgrenciIdByDersId(dto.getDersId()).size();

            if (ogrenciSayisi > toplamKapasite) {
                throw new IllegalArgumentException("Dersliklerin toplam kapasitesi (" + toplamKapasite +
                        "), öğrenci sayısından (" + ogrenciSayisi + ") az!");
            }

            // 2.4 Yeni Sınav Kaydet
            sinav sinav = new sinav();
            BeanUtils.copyProperties(dto, sinav);
            sinav.setDerslikler(derslikler);
            sinav savedSinav = sinavRepository.save(sinav);

            // 2.5 DTO Dönüşümü
            DtoSinav responseDto = new DtoSinav();
            BeanUtils.copyProperties(savedSinav, responseDto);
            responseDto.setDerslikler(savedSinav.getDerslikler());

            dtoSinavList.add(responseDto);
        }

        return dtoSinavList;
    }


    @Override
    public List<DtoSinav> sinavListele(Integer sinavId) {
        List<sinav> sinavlar = sinavRepository.findBySinavId(sinavId);

        return sinavlar.stream().map(sinavEntity -> {
            DtoSinav dto = new DtoSinav();
            BeanUtils.copyProperties(sinavEntity, dto);

            // İlişkisel alan olan derslikler'i manuel olarak set et
            dto.setDerslikler(sinavEntity.getDerslikler());

            return dto;
        }).collect(Collectors.toList());
    }


    @Override
    @Transactional
    public void sinavListTemizle(Integer sinavId) {
        // Önce ilgili sınav kayıtlarını bul
        List<sinav> sinavlar = sinavRepository.findBySinavId(sinavId);

        if (sinavlar == null || sinavlar.isEmpty()) {
            return; // Silinecek bir şey yok
        }

        // Her sınav kaydındaki derslik ilişkisini temizle
        for (sinav s : sinavlar) {
            s.getDerslikler().clear(); // ilişkili derslikleri temizle (JOIN tablo için)
            sinavRepository.save(s);   // güncelle (opsiyonel ama güvenli)
        }

        // Son olarak sınav kayıtlarını sil
        sinavRepository.deleteAll(sinavlar);
    }



}
