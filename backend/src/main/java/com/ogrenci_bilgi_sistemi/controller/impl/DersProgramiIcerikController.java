package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @PutMapping(path = "/save/{dersprogramiId}")
    public List<DtoDersProgramiIcerik> saveDersProgramiList(@RequestBody List<DtoDersProgramiIcerik> dersProgrami, @PathVariable(name="dersprogramiId") Integer id) {
        return dersProgramiIcerikService.saveDersProgramiList(dersProgrami, id);
    }

    @Override
    @GetMapping(path="/kapi-isimligi/{id}")
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiByGorevliId(@PathVariable(name="id") Integer gorevliId) {
        return dersProgramiIcerikService.dersProgramiByGorevliId(gorevliId);
    }

    @Override
    @GetMapping(path="/derslik-programi/{id}")
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiByDerslikId(@PathVariable(name="id") Integer derslikId) {
        return dersProgramiIcerikService.dersProgramiByDerslikId(derslikId);
    }

    @GetMapping(path="/{dersProgramiId}/getir-list")
    @Override
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiIcerikByDersProgramiId(@PathVariable(name="dersProgramiId") Integer dersProgramiId) {
        return dersProgramiIcerikService.dersProgramiIcerikByDersProgramiId(dersProgramiId);
    }

}
