package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslik;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoBolumeGoreDersler;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersIU;
import com.ogrenci_bilgi_sistemi.entities.derslik;
import com.ogrenci_bilgi_sistemi.repository.DerslikRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDerslikService;

@Service
public class DerslikService implements IDerslikService {

    @Autowired
    private DerslikRepository derslikRepository;

    @Override
    public List<DtoDerslik> tumDersliklerList() {
        List<derslik> derslikler = derslikRepository.findAll();

        return derslikler.stream().map(derslik -> {
            DtoDerslik dto = new DtoDerslik();
            BeanUtils.copyProperties(derslik, dto);
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public List<DtoDerslik> dersliklerByBolumId(Integer bolumId) {
        List<derslik> derslikList = derslikRepository.findByBolumId(bolumId);

        return derslikList.stream()
            .map(this::mapToDto)
            .collect(Collectors.toList());
    }

    // Mapper method
    private DtoDerslik mapToDto(derslik derslik) {
        DtoDerslik dto = new DtoDerslik();
        BeanUtils.copyProperties(derslik, dto);
        return dto;
    }

}
