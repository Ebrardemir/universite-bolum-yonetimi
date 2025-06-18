package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIcerikWithDetails;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiWithIcerik;
import com.ogrenci_bilgi_sistemi.entities.Ders;
import com.ogrenci_bilgi_sistemi.entities.ders_programi;
import com.ogrenci_bilgi_sistemi.entities.ders_programi_icerik;
import com.ogrenci_bilgi_sistemi.repository.DersProgramiIcerikRepository;
import com.ogrenci_bilgi_sistemi.repository.DersProgramiRepository;
import com.ogrenci_bilgi_sistemi.repository.DersRepository;
import com.ogrenci_bilgi_sistemi.repository.DerslikRepository;
import com.ogrenci_bilgi_sistemi.repository.GorevliRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersProgramiService;

@Service
public class DersProgramiService implements IDersProgramiService {

    @Autowired
    private DersProgramiRepository dersProgramiRepository;

    @Autowired
    private DersProgramiIcerikRepository dersProgramiIcerikRepository;

    @Autowired
    private DersRepository dersRepository;

    @Autowired
    private GorevliRepository gorevliRepository;

    @Autowired
    private DerslikRepository derslikRepository;

    @Override
    public DtoDersProgrami saveDersProgrami(DtoDersProgramiIU dto) {
        System.out.println("Kontrol ediliyor: " + dto.getBolumId() + "-" + dto.getSinif() + "-" + dto.getDonem());

        Optional<ders_programi> existing = dersProgramiRepository.findByBolumIdAndSinifAndDonem(
                dto.getBolumId(),
                dto.getSinif(),
                dto.getDonem()
        );

        System.out.println("Var mı? " + existing.isPresent());

        if (existing.isPresent()) {
            throw new RuntimeException("Bu ders programı zaten mevcut11!");
        }

        ders_programi dersProgramiEntity = new ders_programi();
        BeanUtils.copyProperties(dto, dersProgramiEntity);
        dersProgramiEntity.setId(null);

        dersProgramiEntity = dersProgramiRepository.save(dersProgramiEntity);

        DtoDersProgrami result = new DtoDersProgrami();
        BeanUtils.copyProperties(dersProgramiEntity, result);
        return result;
    }




    @Override
    public List<DtoDersProgrami> dersProgramiListByBolumId(Integer bolumId) {
        // 1️⃣ İlgili bölümün ders programlarını DB'den getir
        List<ders_programi> dersProgramlari = dersProgramiRepository.findByBolumId(bolumId);

        // 2️⃣ BeanUtils kullanarak DTO listesine çevir
        return dersProgramlari.stream()
                .map(dp -> {
                    DtoDersProgrami dto = new DtoDersProgrami();
                    BeanUtils.copyProperties(dp, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public DtoDersProgrami dersProgramiById(Integer id) {
        // 1️⃣ ID ile veritabanından bul
        ders_programi entity = dersProgramiRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ders programı bulunamadı: " + id));

        // 2️⃣ Entity → DTO dönüştür
        DtoDersProgrami dto = new DtoDersProgrami();
        BeanUtils.copyProperties(entity, dto);

        return dto;
    }



}
