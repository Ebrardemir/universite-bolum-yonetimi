package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslik;
import com.ogrenci_bilgi_sistemi.entities.Ders;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDers;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoGorevli;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinav;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavIU;
import com.ogrenci_bilgi_sistemi.entities.derslik;
import com.ogrenci_bilgi_sistemi.entities.gorevli;
import com.ogrenci_bilgi_sistemi.entities.sinav;
import com.ogrenci_bilgi_sistemi.repository.DersRepository;
import com.ogrenci_bilgi_sistemi.repository.DerslikRepository;
import com.ogrenci_bilgi_sistemi.repository.GorevliRepository;
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

    @Autowired
    private DersRepository dersRepository;

    @Autowired
    private GorevliRepository gorevliRepository;

    @Override
    @Transactional
    public List<DtoSinav> sinavSave(List<DtoSinavIU> sinavList) {
        if (sinavList == null || sinavList.isEmpty()) {
            throw new IllegalArgumentException("Sınav listesi boş olamaz.");
        }

        Integer sinavId = sinavList.get(0).getSinavId(); // Bu senin sinav_table.id

        // 1️⃣ Eski sınavları sil
        sinavRepository.deleteBySinavId(sinavId);

        List<DtoSinav> dtoSinavList = new ArrayList<>();

        for (DtoSinavIU dto : sinavList) {

            // ✅ A) Çakışma kontrolleri: sadece aynı sinavId içinde kontrol
            for (Integer derslikId : dto.getDerslikIdList()) {
                boolean derslikCakisiyor = sinavRepository.existsByDerslikIdAndSinavTarihAndSaatAralikAndSinavId(
                        derslikId, dto.getSinavTarih(), dto.getBaslangicSaati(), dto.getBitisSaati(), sinavId);

                if (derslikCakisiyor) {
                    throw new IllegalArgumentException("Derslik ID " + derslikId + " bu saatte aynı taslak içinde başka sınav için kullanılıyor!");
                }
            }

            boolean gozetmenCakisiyor = sinavRepository.existsByGozetmenIdAndSinavTarihAndSaatAralikAndSinavId(
                    dto.getGozetmenId(), dto.getSinavTarih(), dto.getBaslangicSaati(), dto.getBitisSaati(), sinavId);

            if (gozetmenCakisiyor) {
                throw new IllegalArgumentException("Gözetmen bu saatte aynı taslak içinde başka sınavda görevli!");
            }

            // B) Derslikleri getir
            List<derslik> derslikler = dto.getDerslikIdList().stream()
                    .map(id -> derslikRepository.findById(id)
                            .orElseThrow(() -> new IllegalArgumentException("Derslik bulunamadı: " + id)))
                    .collect(Collectors.toList());

            // C) Kapasite kontrolü
            int toplamKapasite = derslikler.stream().mapToInt(d -> d.getKapasite()).sum();
            int ogrenciSayisi = ogrenciDersRepository.findOgrenciIdByDersId(dto.getDersId()).size();

            if (ogrenciSayisi > toplamKapasite) {
                throw new IllegalArgumentException("Dersliklerin toplam kapasitesi (" + toplamKapasite + ") öğrenci sayısından (" + ogrenciSayisi + ") az!");
            }

            // D) Sınav kaydet
            sinav sinav = new sinav();
            BeanUtils.copyProperties(dto, sinav);
            sinav.setDerslikler(derslikler);
            sinav savedSinav = sinavRepository.save(sinav);

            // E) DTO dönüşümü
            DtoSinav responseDto = new DtoSinav();
            BeanUtils.copyProperties(savedSinav, responseDto);

            List<DtoDerslik> dtoDerslikler = savedSinav.getDerslikler().stream()
                    .map(d -> {
                        DtoDerslik dtoDerslik = new DtoDerslik();
                        BeanUtils.copyProperties(d, dtoDerslik);
                        return dtoDerslik;
                    })
                    .collect(Collectors.toList());
            responseDto.setDerslikler(dtoDerslikler);

            // ders
            Ders dersEntity = dersRepository.findById(savedSinav.getDersId()).orElse(null);
            if (dersEntity != null) {
                DtoDers dtoDers = new DtoDers();
                BeanUtils.copyProperties(dersEntity, dtoDers);
                responseDto.setDers(dtoDers);
            }

            // gorevli
            gorevli gorevliEntity = gorevliRepository.findById(savedSinav.getGozetmenId()).orElse(null);
            if (gorevliEntity != null) {
                DtoGorevli dtoGorevli = new DtoGorevli();
                BeanUtils.copyProperties(gorevliEntity, dtoGorevli);
                responseDto.setGorevli(dtoGorevli);
            }

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

            // ✅ derslikler: Entity → DTO
            List<DtoDerslik> dtoDerslikler = sinavEntity.getDerslikler().stream()
                    .map(d -> {
                        DtoDerslik dtoDerslik = new DtoDerslik();
                        BeanUtils.copyProperties(d, dtoDerslik);
                        return dtoDerslik;
                    })
                    .collect(Collectors.toList());
            dto.setDerslikler(dtoDerslikler);

            // ✅ ders
            Ders dersEntity = dersRepository.findById(sinavEntity.getDersId()).orElse(null);
            if (dersEntity != null) {
                DtoDers dtoDers = new DtoDers();
                BeanUtils.copyProperties(dersEntity, dtoDers);
                dto.setDers(dtoDers);
            }

            // ✅ gorevli
            gorevli gorevliEntity = gorevliRepository.findById(sinavEntity.getGozetmenId()).orElse(null);
            if (gorevliEntity != null) {
                DtoGorevli dtoGorevli = new DtoGorevli();
                BeanUtils.copyProperties(gorevliEntity, dtoGorevli);
                dto.setGorevli(dtoGorevli);
            }

            return dto;
        }).collect(Collectors.toList());
    }


    @Override
    @Transactional
    public void sinavListTemizle(Integer sinavId) {
        List<sinav> sinavlar = sinavRepository.findBySinavId(sinavId);
        if (sinavlar == null || sinavlar.isEmpty()) return;

        for (sinav s : sinavlar) {
            s.getDerslikler().clear();
            sinavRepository.save(s);
        }
        sinavRepository.deleteAll(sinavlar);
    }

    @Override
    public List<DtoSinav> sinavListByGozetmenId(Integer gozetmenId) {
        List<sinav> sinavList = sinavRepository.findByGozetmenId(gozetmenId);

        List<DtoSinav> dtoList = new ArrayList<>();

        for (sinav sinav : sinavList) {
            DtoSinav dto = new DtoSinav();
            BeanUtils.copyProperties(sinav, dto);

            // ✏️ DERS
            if (sinav.getDersId() != null) {
                Ders dersEntity = dersRepository.findById(sinav.getDersId()).orElse(null);
                if (dersEntity != null) {
                    DtoDers dersDto = new DtoDers();
                    BeanUtils.copyProperties(dersEntity, dersDto);
                    dto.setDers(dersDto);
                }
            }

            // ✏️ GÖREVLI
            if (sinav.getGozetmenId() != null) {
                gorevli gorevliEntity = gorevliRepository.findById(sinav.getGozetmenId()).orElse(null);
                if (gorevliEntity != null) {
                    DtoGorevli gorevliDto = new DtoGorevli();
                    BeanUtils.copyProperties(gorevliEntity, gorevliDto);
                    dto.setGorevli(gorevliDto);
                }
            }

            // ✏️ DERSLIKLERS (Çoklu Liste!)
            List<derslik> derslikEntities = sinav.getDerslikler(); // Eğer ManyToMany ise
            if (derslikEntities != null && !derslikEntities.isEmpty()) {
                List<DtoDerslik> derslikDtos = new ArrayList<>();
                for (derslik derslikEntity : derslikEntities) {
                    DtoDerslik derslikDto = new DtoDerslik();
                    BeanUtils.copyProperties(derslikEntity, derslikDto);
                    derslikDtos.add(derslikDto);
                }
                dto.setDerslikler(derslikDtos);
            }

            dtoList.add(dto);
        }

        return dtoList;
    }

}
