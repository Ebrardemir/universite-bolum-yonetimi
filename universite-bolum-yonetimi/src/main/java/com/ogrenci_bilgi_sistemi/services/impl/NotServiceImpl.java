package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoNot;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoNotIU;
import com.ogrenci_bilgi_sistemi.entities.not;
import com.ogrenci_bilgi_sistemi.repository.NotRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.INotService;

@Service
public class NotServiceImpl implements INotService {

    @Autowired
    private NotRepository notRepository;

    @Override
    public DtoNot notSave(DtoNotIU dtoNotIU) {
        not notEntity = new not();
        BeanUtils.copyProperties(dtoNotIU, notEntity); // Dto'dan Entity'ye kopyalama

        not dbNot = notRepository.save(notEntity); // DB'ye kaydetme

        DtoNot dtoNot = new DtoNot();
        BeanUtils.copyProperties(dbNot, dtoNot); // Entity'den DTO'ya kopyalama

        return dtoNot;
    }

    @Override
    public List<DtoNot> notGetir(Integer sinavId) {
        List<not> notList = notRepository.findBySinavId(sinavId); // Repo'dan veriyi çek
        List<DtoNot> dtoList = new ArrayList<>();

        for (not notEntity : notList) {
            DtoNot dto = new DtoNot();
            BeanUtils.copyProperties(notEntity, dto); // Entity'den DTO'ya kopyala
            dtoList.add(dto);
        }

        return dtoList;
    }

}