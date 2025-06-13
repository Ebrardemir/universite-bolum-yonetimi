package com.ogrenci_bilgi_sistemi.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IDersProgramiController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiWithIcerik;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersProgramiService;

@RestController
@RequestMapping("rest/api/ders-programi")
public class DersProgramiController implements IDersProgramiController{

    @Autowired
    private IDersProgramiService dersProgramiService;

    @Override
    @PostMapping(path = "/save")
    public DtoDersProgramiWithIcerik saveDersProgrami(@RequestBody DtoDersProgramiIU dersProgrami) {
        return dersProgramiService.saveDersProgrami(dersProgrami);
    }

}
