package com.ogrenci_bilgi_sistemi.controller.impl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IDersController;
import com.ogrenci_bilgi_sistemi.entities.Ders;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersServices;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController
@RequestMapping("/rest/api/ders")
public class DersControllerImpl implements IDersController {

    @Autowired
    private IDersServices dersServices;

    @PostMapping(path = "/save")
    @Override
    public Ders saveDers(@RequestBody Ders ders){
        return dersServices.saveDers(ders);
    }

}
