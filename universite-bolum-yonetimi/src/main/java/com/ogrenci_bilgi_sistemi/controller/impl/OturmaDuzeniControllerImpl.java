package com.ogrenci_bilgi_sistemi.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IOturmaDuzeniController;
import com.ogrenci_bilgi_sistemi.services.Iservices.IOturmaDuzeniService;

@RestController
@RequestMapping("rest/api/oturma-duzeni/")
public class OturmaDuzeniControllerImpl implements IOturmaDuzeniController{

    @Autowired
    private IOturmaDuzeniService oturmaDuzeniService;

    @GetMapping(path="olustur/{sinavId}")
    @Override
    public void oturmaDuzeniOlustur(@PathVariable(name="sinavId") Integer sinavId) {
        oturmaDuzeniService.oturmaDuzeniOlustur(sinavId);
    }

}
