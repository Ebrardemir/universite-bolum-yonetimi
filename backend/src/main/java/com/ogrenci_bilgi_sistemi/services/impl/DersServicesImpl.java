package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDers;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoBolumaveDonemeGoreDerslerIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoBolumeGoreDersler;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersForDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersIU;
import com.ogrenci_bilgi_sistemi.entities.Ders;
import com.ogrenci_bilgi_sistemi.entities.ders_programi_icerik;
import com.ogrenci_bilgi_sistemi.repository.DersProgramiIcerikRepository;
import com.ogrenci_bilgi_sistemi.repository.DersRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersServices;

@Service
public class DersServicesImpl implements IDersServices {

    @Autowired
    private DersRepository dersRepository;

    @Autowired
    private DersProgramiIcerikRepository dersProgramiIcerikRepository;

    @Override
    public DtoDers saveDers(DtoDersIU dto) {
        Ders entity = new Ders();
        BeanUtils.copyProperties(dto, entity);
        Ders saved = dersRepository.save(entity);

        DtoDers dtoOut = new DtoDers();
        BeanUtils.copyProperties(saved, dtoOut);
        return dtoOut;
    }

    @Override
    public List<DtoDers> getAllDers() {
        return dersRepository.findAll()
                .stream()
                .map(ders -> {
                    DtoDers dto = new DtoDers();
                    BeanUtils.copyProperties(ders, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public DtoDers getDersById(Integer id) {
        return dersRepository.findById(id)
                .map(ders -> {
                    DtoDers dto = new DtoDers();
                    BeanUtils.copyProperties(ders, dto);
                    return dto;
                })
                .orElse(null);
    }

    @Override
    public void deleteDers(Integer id) {
        dersRepository.findById(id).ifPresent(dersRepository::delete);
    }

    @Override
    public List<DtoDers> derslerBolumeGore(DtoBolumeGoreDersler dto) {
        return dersRepository.findByBolumIdAndSinifAndDonem(
                dto.getBolumId(), dto.getSinif(), dto.getDonem()
        ).stream()
         .map(ders -> {
             DtoDers dtoOut = new DtoDers();
             BeanUtils.copyProperties(ders, dtoOut);
             return dtoOut;
         })
         .collect(Collectors.toList());
    }

    @Override
    public List<DtoDers> derslerForDersProgrami(DtoDersForDersProgrami dto) {
        Integer bolumId = dto.getBolumId();
        Integer sinif = dto.getSinif();
        Integer donem = dto.getDonem();
        Integer dersProgramiId = dto.getDersProgramiId();

        List<Ders> dersList = dersRepository.findByBolumIdAndSinifAndDonem(bolumId, sinif, donem);
        List<ders_programi_icerik> programIcerikList = dersProgramiIcerikRepository.findByDersProgramiId(dersProgramiId);

        Map<Integer, Integer> kullanilanSaatMap = new HashMap<>();
        for (ders_programi_icerik icerik : programIcerikList) {
            kullanilanSaatMap.merge(
                icerik.getDersId(),
                icerik.getSaatSayisi(),
                Integer::sum
            );
        }

        List<DtoDers> resultList = new ArrayList<>();
        for (Ders ders : dersList) {
            int toplamSaat = ders.getSaatSayisi();
            int kullanilan = kullanilanSaatMap.getOrDefault(ders.getId(), 0);
            int kalanSaat = Math.max(toplamSaat - kullanilan, 0);

            DtoDers resultDto = new DtoDers();
            resultDto.setId(ders.getId());
            resultDto.setDersAdi(ders.getDersAdi());
            resultDto.setBolumId(ders.getBolumId());
            resultDto.setSinif(ders.getSinif());
            resultDto.setDonem(ders.getDonem());
            resultDto.setSaatSayisi(kalanSaat);
            resultDto.setAlanKisiSayisi(ders.getAlanKisiSayisi());

            resultList.add(resultDto);
        }

        return resultList;
    }


    @Override
    public List<DtoDers> derslerDonemeveBolumeGore(DtoBolumaveDonemeGoreDerslerIU dtoBolumaveDonemeGoreDerslerIU) {
        Integer bolumId = dtoBolumaveDonemeGoreDerslerIU.getBolumId();
        Integer donem = dtoBolumaveDonemeGoreDerslerIU.getDonem();

        List<Ders> dersList = dersRepository.findByBolumIdAndDonem(bolumId, donem);

        return dersList.stream()
                .map(ders -> {
                    DtoDers dto = new DtoDers();
                    BeanUtils.copyProperties(ders, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
