package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import com.ogrenci_bilgi_sistemi.services.Iservices.IRolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IRolController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoRol;

@RestController
@RequestMapping("rest/api/rol/")
public class RolControllerImpl implements IRolController{

    @Autowired
    private IRolService rolService;

    @GetMapping(path="getir-list")
    @Override
    public List<DtoRol> rolList() {
        return rolService.rolList();
    }

}
