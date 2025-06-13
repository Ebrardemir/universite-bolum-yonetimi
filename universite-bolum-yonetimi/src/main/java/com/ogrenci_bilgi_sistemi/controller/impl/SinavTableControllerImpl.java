package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.ISinavTableController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinavTable;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavTableUI;
import com.ogrenci_bilgi_sistemi.services.Iservices.ISinavTableService;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("rest/api/sinav-table/")
public class SinavTableControllerImpl implements ISinavTableController{

    @Autowired
    private ISinavTableService sinavTableService;

    @Override
    @PostMapping(path="save")
    public DtoSinavTable sinavTableSave(@RequestBody DtoSinavTableUI sinavTableUI) {
        return sinavTableService.sinavTableSave(sinavTableUI);
    }

    @Override
    @PutMapping(path="{sinavId}/onayla")
    public DtoSinavTable sinavTableOnayla(@PathVariable(name="sinavId") Integer sinavId) {
        return sinavTableService.sinavTableOnayla(sinavId);
    }

    @GetMapping(path="{bolumId}/getir/list")
    @Override
    public List<DtoSinavTable> sinavTableListe(@PathVariable(name="bolumId") Integer bolumId) {
        return sinavTableService.sinavTableListe(bolumId);
    }

    @GetMapping(path="{id}/getir")
    @Override
    public DtoSinavTable sinavTableById(@PathVariable(name="id") Integer id) {
        return sinavTableService.sinavTableById(id);
    }

}
