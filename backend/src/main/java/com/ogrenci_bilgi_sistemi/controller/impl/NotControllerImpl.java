package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.INotController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoNot;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoNotIU;
import com.ogrenci_bilgi_sistemi.services.Iservices.INotService;

@RestController
@RequestMapping("rest/api/not/")
public class NotControllerImpl implements INotController{

    @Autowired
    private INotService notService;

    @PostMapping(path="save")
    @Override
    public DtoNot notSave(@RequestBody DtoNotIU dtoNotIU) {
        return notService.notSave(dtoNotIU);
    }

    @GetMapping(path="{sinavId}/getir")
    @Override
    public List<DtoNot> notGetir(@PathVariable(name="sinavId") Integer sinavId) {
        return notService.notGetir(sinavId);
    }

    
}
