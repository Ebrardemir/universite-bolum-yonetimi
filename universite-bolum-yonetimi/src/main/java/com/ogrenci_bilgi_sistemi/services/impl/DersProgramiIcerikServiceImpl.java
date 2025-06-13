package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgramiIcerik;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIcerikWithDetails;
import com.ogrenci_bilgi_sistemi.entities.Ders;
import com.ogrenci_bilgi_sistemi.entities.ders_programi;
import com.ogrenci_bilgi_sistemi.entities.ders_programi_icerik;
import com.ogrenci_bilgi_sistemi.entities.gorevli;
import com.ogrenci_bilgi_sistemi.repository.DersProgramiIcerikRepository;
import com.ogrenci_bilgi_sistemi.repository.DersProgramiRepository;
import com.ogrenci_bilgi_sistemi.repository.DersRepository;
import com.ogrenci_bilgi_sistemi.repository.DerslikRepository;
import com.ogrenci_bilgi_sistemi.repository.GorevliRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersProgramiIcerikService;

@Service
public class DersProgramiIcerikServiceImpl implements IDersProgramiIcerikService {

    @Autowired
    private DersProgramiRepository dersProgramiRepository;

    @Autowired
    private DersProgramiIcerikRepository dersProgramiIcerikRepository;

    @Autowired
    private DersRepository dersRepository;

    @Autowired
    private DerslikRepository derslikRepository;

    @Autowired
    private GorevliRepository gorevliRepository;

    @Override
    public List<DtoDersProgramiIcerik> saveDersProgramiList(List<DtoDersProgramiIcerik> dtoList) {
        return dtoList.stream().map(dto -> {
            Integer dpId = dto.getDersProgramiId();

            // 1. ID kontrolü
            dersProgramiRepository.findById(dpId)
                .orElseThrow(() -> new IllegalArgumentException("ders_programi_id bulunamadı: " + dpId));

            // 2. Kapasite kontrolü
            int alanKisiSayisi = dersRepository.findById(dto.getDersId())
                .orElseThrow(() -> new IllegalArgumentException("Ders bulunamadı: " + dto.getDersId()))
                .getAlanKisiSayisi();

            int kapasite = derslikRepository.findById(dto.getDerslikId())
                .orElseThrow(() -> new IllegalArgumentException("Derslik bulunamadı: " + dto.getDerslikId()))
                .getKapasite();

            if (alanKisiSayisi > kapasite) {
                throw new IllegalArgumentException("Derslik kapasitesi yetersiz: " + kapasite + ", Gerekli: " + alanKisiSayisi);
            }

            // 3. Çakışma kontrolleri
            if (dersProgramiIcerikRepository.existsByDerslikIdAndGunAndZamanAraligi(
                    dto.getDerslikId(), dto.getGun(), dto.getBaslangicSaati(), dto.getBitisSaati())) {
                throw new IllegalArgumentException("Derslik bu saatte dolu: " + dto.getBaslangicSaati() + " - " + dto.getBitisSaati());
            }

            if (dersProgramiIcerikRepository.existsByGorevliIdAndGunAndZamanAraligi(
                    dto.getGorevliId(), dto.getGun(), dto.getBaslangicSaati(), dto.getBitisSaati())) {
                throw new IllegalArgumentException("Öğretmenin bu saatte dersi var: " + dto.getBaslangicSaati() + " - " + dto.getBitisSaati());
            }

            // 4. Kayıt
            ders_programi_icerik entity = new ders_programi_icerik();
            BeanUtils.copyProperties(dto, entity);
            ders_programi_icerik saved = dersProgramiIcerikRepository.save(entity);

            DtoDersProgramiIcerik savedDto = new DtoDersProgramiIcerik();
            BeanUtils.copyProperties(saved, savedDto);
            return savedDto;
        }).collect(Collectors.toList());
    }


    @Override
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiByGorevliId(Integer gorevliId) {
        List<ders_programi_icerik> icerikList = dersProgramiIcerikRepository.findByGorevliId(gorevliId);

        if (icerikList.isEmpty()) {
            return List.of();
        }

        // Sadece bir kere çek ve kontrol et
        Optional<gorevli> gorevliOpt = gorevliRepository.findById(gorevliId);
        if (gorevliOpt.isEmpty()) {
            throw new RuntimeException("Görevli bulunamadı.");
        }

        var gorevli = gorevliOpt.get();

        List<DtoDersProgramiIcerikWithDetails> dtoList = new ArrayList<>();

        for (ders_programi_icerik icerik : icerikList) {
            String dersAdi = dersRepository.findById(icerik.getDersId())
                .map(Ders::getDersAdi)
                .orElse("Ders Adı Bulunamadı");

            String derslikAdi = derslikRepository.findById(icerik.getDerslikId())
                .map(d -> d.getDerslikAdi())
                .orElse("Derslik Bulunamadı");

            DtoDersProgramiIcerikWithDetails dto = new DtoDersProgramiIcerikWithDetails(
                icerik.getGun(),
                icerik.getBaslangicSaati(),
                icerik.getBitisSaati(),
                icerik.getSaatSayisi(),
                dersAdi,
                gorevli.getUnvan(),
                gorevli.getIsim(),
                gorevli.getSoyisim(),
                derslikAdi
            );

            dtoList.add(dto);
        }

        return dtoList;
    }




    @Override
    public List<DtoDersProgramiIcerik> dersProgramiByDerslikId(Integer derslikId) {
        List<ders_programi_icerik> icerikList = dersProgramiIcerikRepository.findByDerslikId(derslikId);

        if (!icerikList.isEmpty()) {
            List<DtoDersProgramiIcerik> dtoIcerikList = new ArrayList<>();
        
            for (ders_programi_icerik entity : icerikList) {
                DtoDersProgramiIcerik dto = new DtoDersProgramiIcerik();
                BeanUtils.copyProperties(entity, dto); // entity → dto kopyalanıyor
                dtoIcerikList.add(dto);
            }
        
            return dtoIcerikList;
        }
        
        else{
            return null;
        }
    }

}
