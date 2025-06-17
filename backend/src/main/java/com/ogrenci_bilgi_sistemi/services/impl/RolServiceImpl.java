package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoRol;
import com.ogrenci_bilgi_sistemi.entities.rol;
import com.ogrenci_bilgi_sistemi.repository.RolRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IRolService;

@Service
public class RolServiceImpl implements IRolService{

    @Autowired
    RolRepository rolRepository;

    @Override
    public List<DtoRol> rolList() {
        // Tüm rolleri DB’den al
        List<rol> roller = rolRepository.findAll();

        // Roller -> DtoRol listesine çevir
        List<DtoRol> dtoRoller = new ArrayList<>();

        for (rol rol : roller) {
            DtoRol dto = new DtoRol();
            BeanUtils.copyProperties(rol, dto);
            dtoRoller.add(dto);
        }

        return dtoRoller;
    }

}
