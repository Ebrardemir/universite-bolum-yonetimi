package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IDersProgramiIcerikController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgramiIcerik;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIcerikWithDetails;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersProgramiIcerikService;

@RestController
@RequestMapping("rest/api/ders-programi-icerik")
public class DersProgramiIcerikController implements IDersProgramiIcerikController {

    @Autowired
    private IDersProgramiIcerikService dersProgramiIcerikService;

    @Override
    @PostMapping(path = "/save")
    public List<DtoDersProgramiIcerik> saveDersProgramiList(@RequestBody List<DtoDersProgramiIcerik> dersProgrami) {
        return dersProgramiIcerikService.saveDersProgramiList(dersProgrami);
    }

    @Override
    @GetMapping(path="/kapi-isimligi/{id}")
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiByGorevliId(@PathVariable(name="id") Integer gorevliId) {
        return dersProgramiIcerikService.dersProgramiByGorevliId(gorevliId);
    }

    @Override
    @GetMapping(path="/derslik-programi/{id}")
    public List<DtoDersProgramiIcerik> dersProgramiByDerslikId(@PathVariable(name="id") Integer derslikId) {
        return dersProgramiIcerikService.dersProgramiByDerslikId(derslikId);
    }

}
