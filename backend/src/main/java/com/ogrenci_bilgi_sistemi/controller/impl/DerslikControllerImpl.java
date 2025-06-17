package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IDerslikController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslik;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDerslikService;

@RestController
@RequestMapping("rest/api/derslik")
public class DerslikControllerImpl implements IDerslikController{

    @Autowired
    private IDerslikService derslikService;

    @Override
    @GetMapping(path="/getir-all")
    public List<DtoDerslik> tumDersliklerList() {
        return derslikService.tumDersliklerList();
    }

    @GetMapping(path="/getir/{bolumId}")
    @Override
    public List<DtoDerslik> dersliklerByBolumId(@PathVariable(name="bolumId") Integer bolumId) {
        return derslikService.dersliklerByBolumId(bolumId);
    }

}
