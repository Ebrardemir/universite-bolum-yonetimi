package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.INotController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoNot;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoNotIU;
import com.ogrenci_bilgi_sistemi.services.Iservices.INotService;

@RestController
@RequestMapping("rest/api/not/")
public class NotControllerImpl implements INotController{

    @Autowired
    private INotService notService;

    @PostMapping(path="save/sinav")
    @Override
    public DtoNot notSaveSinav(@RequestBody DtoNotIU dtoNotIU) {
        return notService.notSaveSinav(dtoNotIU);
    }

    @GetMapping(path="{sinavId}/getir-sinav")
    @Override
    public List<DtoNot> notGetirSinav(@PathVariable(name="sinavId") Integer sinavId) {
        return notService.notGetirSinav(sinavId);
    }

    @PostMapping(path="save/ders-programi")
    @Override
    public DtoNot notSaveDersProgrami(@RequestBody DtoNotIU dtoNotIU) {
        return notService.notSaveDersProgrami(dtoNotIU);
    }

    @PutMapping(path="{notId}/guncelle")
    @Override
    public DtoNot notGuncelle(@PathVariable(name="notId") Integer id,@RequestBody DtoNotIU dtoNotIU) {
        return notService.notGuncelle(id, dtoNotIU);
    }

    @GetMapping(path="{dersProgramiId}/getir-ders-programi")
    @Override
    public List<DtoNot> notGetirDersProgrami(@PathVariable(name="dersProgramiId") Integer dersProgramiId) {
        return notService.notGetirDersProgrami(dersProgramiId);
    }


}
