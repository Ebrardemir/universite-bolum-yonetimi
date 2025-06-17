package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoGorevliRolU;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IGorevliController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoGorevli;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoGirisBilgileri;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoGorevliIU;
import com.ogrenci_bilgi_sistemi.services.Iservices.IGorevliService;

@RestController
@RequestMapping("rest/api/gorevli/")
public class GorevliControllerImpl implements IGorevliController{

    @Autowired
    private IGorevliService gorevliService;

    @Override
    @GetMapping(path="ogretim-elemanlari-list")
    public List<DtoGorevli> OgretimElemanlariList() {
        return gorevliService.OgretimElemanlariList();
    }

    @Override
    @GetMapping(path="ogretim-elemanlari-list/{bolumId}")
    public List<DtoGorevli> ogretimElemanlariListByBolumId(@PathVariable(name="bolumId") Integer bolumId) {
        return gorevliService.ogretimElemanlariListByBolumId(bolumId);
    }

    @PostMapping(path="giris-yap")
    @Override
    public DtoGorevli girisYap(@RequestBody DtoGirisBilgileri girisBilgileri) {
        return gorevliService.girisYap(girisBilgileri);
    }

    @PostMapping(path="kaydet")
    @Override
    public DtoGorevli kayit(@RequestBody DtoGorevliIU dtoGorevliIU) {
        return gorevliService.kayit(dtoGorevliIU);
    }

    @GetMapping(path="{bolumId}/list-getir")
    @Override
    public List<DtoGorevli> tumGorevlilerListByBolumId(@PathVariable(name="bolumId") Integer bolumId) {
        return gorevliService.tumGorevlilerListByBolumId(bolumId);
    }

    @PutMapping(path="guncelle/rol")
    @Override
    public DtoGorevli gorevliRolGuncelle(@RequestBody DtoGorevliRolU dtoGorevliRolU) {
        return gorevliService.gorevliRolGuncelle(dtoGorevliRolU);
    }

}
