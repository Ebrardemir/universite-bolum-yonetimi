package com.ogrenci_bilgi_sistemi.services.impl;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslikSira;
import com.ogrenci_bilgi_sistemi.entities.derslik_sira;
import com.ogrenci_bilgi_sistemi.repository.DerslikSiraRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDerslikSiraService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DerslikSiraServiceImpl implements IDerslikSiraService {

    @Autowired
    private DerslikSiraRepository derslikSiraRepository;


    @Override
    public List<DtoDerslikSira> derslikSiraList(Integer derslikId) {
        List<derslik_sira> entityList = derslikSiraRepository.findByDerslikId(derslikId);

        return entityList.stream().map(entity -> {
            DtoDerslikSira dto = new DtoDerslikSira();
            BeanUtils.copyProperties(entity, dto);
            return dto;
        }).toList();
    }
}
