package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public DtoNot notSaveSinav(DtoNotIU dtoNotIU) {
        not notEntity = new not();
        BeanUtils.copyProperties(dtoNotIU, notEntity); // Dto'dan Entity'ye kopyalama

        not dbNot = notRepository.save(notEntity); // DB'ye kaydetme

        DtoNot dtoNot = new DtoNot();
        BeanUtils.copyProperties(dbNot, dtoNot); // Entity'den DTO'ya kopyalama

        return dtoNot;
    }

    @Override
    public List<DtoNot> notGetirSinav(Integer sinavId) {
        List<not> notList = notRepository.findBySinavId(sinavId); // Repo'dan veriyi çek
        List<DtoNot> dtoList = new ArrayList<>();

        for (not notEntity : notList) {
            DtoNot dto = new DtoNot();
            BeanUtils.copyProperties(notEntity, dto); // Entity'den DTO'ya kopyala
            dtoList.add(dto);
        }

        return dtoList;
    }

    @Override
    public DtoNot notSaveDersProgrami(DtoNotIU dtoNotIU) {
        not notEntity = new not();
        BeanUtils.copyProperties(dtoNotIU, notEntity);

        // SINAV_ID boş kalabilir, burada dersProgramiIcerikId kullanılıyor
        not dbNot = notRepository.save(notEntity);

        DtoNot dto = new DtoNot();
        BeanUtils.copyProperties(dbNot, dto);

        return dto;
    }

    @Override
    public DtoNot notGuncelle(Integer id, DtoNotIU dtoNotIU) {
        not notEntity = notRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Not bulunamadı"));

        notEntity.setGorevliNot(dtoNotIU.getGorevliNot());
        not updated = notRepository.save(notEntity);

        DtoNot dto = new DtoNot();
        BeanUtils.copyProperties(updated, dto);
        return dto;
    }


    @Override
    public List<DtoNot> notGetirDersProgrami(Integer dersProgramiId) {
        List<not> notList = notRepository.findByDersProgramiIcerikId(dersProgramiId);
        List<DtoNot> dtoList = new ArrayList<>();

        for (not notEntity : notList) {
            DtoNot dto = new DtoNot();
            BeanUtils.copyProperties(notEntity, dto);
            dtoList.add(dto);
        }

        return dtoList;
    }


}