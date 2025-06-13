package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public DtoDersProgramiWithIcerik saveDersProgrami(DtoDersProgramiIU dto) {
        // Var olan ders programını kontrol et
        Optional<ders_programi> existing = dersProgramiRepository.findByBolumIdAndSinifAndDonem(
            dto.getBolumId(),
            dto.getSinif(),
            dto.getDonem()
        );

        ders_programi dersProgramiEntity;

        if (existing.isPresent()) {
            // Zaten varsa kullan
            dersProgramiEntity = existing.get();
        } else {
            // Yoksa yeni oluştur
            dersProgramiEntity = new ders_programi();
            dersProgramiEntity.setBolumId(dto.getBolumId());
            dersProgramiEntity.setSinif(dto.getSinif());
            dersProgramiEntity.setDonem(dto.getDonem());
            dersProgramiEntity = dersProgramiRepository.save(dersProgramiEntity);
        }

        // İçerikleri al
        List<ders_programi_icerik> icerikler = dersProgramiIcerikRepository.findByDersProgramiId(dersProgramiEntity.getId());

        List<DtoDersProgramiIcerikWithDetails> icerikDtoList = icerikler.stream().map(icerik -> {
            String dersAdi = dersRepository.findById(icerik.getDersId())
                    .map(Ders::getDersAdi)
                    .orElse("Ders Adı Bulunamadı");

            String unvan = gorevliRepository.findById(icerik.getGorevliId())
                    .map(gorevli -> gorevli.getUnvan())
                    .orElse("Ünvan Bulunamadı");

            String isim = gorevliRepository.findById(icerik.getGorevliId())
                    .map(gorevli -> gorevli.getIsim())
                    .orElse("İsim Bulunamadı");

            String soyisim = gorevliRepository.findById(icerik.getGorevliId())
                    .map(gorevli -> gorevli.getSoyisim())
                    .orElse("Soyisim Bulunamadı");

            String derslikAdi = derslikRepository.findById(icerik.getDerslikId())
                    .map(derslik -> derslik.getDerslikAdi())
                    .orElse("Derslik Bulunamadı");

            return new DtoDersProgramiIcerikWithDetails(
                icerik.getGun(),
                icerik.getBaslangicSaati(),
                icerik.getBitisSaati(),
                icerik.getSaatSayisi(),
                dersAdi,
                unvan,
                isim,
                soyisim,
                derslikAdi
            );
        }).collect(Collectors.toList());

        return new DtoDersProgramiWithIcerik(
            dersProgramiEntity.getId(),
            dersProgramiEntity.getBolumId(),
            dersProgramiEntity.getSinif(),
            dersProgramiEntity.getDonem(),
            icerikDtoList
        );
    }


}
