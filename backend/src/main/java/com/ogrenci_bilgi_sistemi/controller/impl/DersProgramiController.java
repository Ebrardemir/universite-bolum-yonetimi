package com.ogrenci_bilgi_sistemi.controller.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IDersProgramiController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiWithIcerik;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersProgramiService;

import java.util.List;

@RestController
@RequestMapping("rest/api/ders-programi")
public class DersProgramiController implements IDersProgramiController{

    @Autowired
    private IDersProgramiService dersProgramiService;

    @Override
    @PostMapping(path = "/save")
    public DtoDersProgrami saveDersProgrami(@RequestBody DtoDersProgramiIU dersProgrami) {
        return dersProgramiService.saveDersProgrami(dersProgrami);
    }

    @GetMapping(path="/{bolumId}/list")
    @Override
    public List<DtoDersProgrami> dersProgramiListByBolumId(@PathVariable(name="bolumId") Integer bolumId) {
        return dersProgramiService.dersProgramiListByBolumId(bolumId);
    }

    @GetMapping(path="/{id}/getir")
    @Override
    public DtoDersProgrami dersProgramiById(@PathVariable(name="id") Integer id) {
        return dersProgramiService.dersProgramiById(id);
    }

}
