package com.ogrenci_bilgi_sistemi.controller.impl;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IDersController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDers;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoBolumaveDonemeGoreDerslerIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoBolumeGoreDersler;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersForDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersIU;
import com.ogrenci_bilgi_sistemi.entities.Ders;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersServices;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;




@RestController
@RequestMapping("/rest/api/ders")
public class DersControllerImpl implements IDersController {

    @Autowired
    private IDersServices dersServices;

    @PostMapping(path = "/save")
    @Override
    public DtoDers saveDers(@RequestBody DtoDersIU ders){
        return dersServices.saveDers(ders);
    }

    @GetMapping(path="/list")
    @Override
    public List<DtoDers> getAllDers() {
        
        return  dersServices.getAllDers();
    }
    
    
    @GetMapping(path="/list/{id}")
    @Override
    public DtoDers getDersById( @PathVariable(name="id") Integer id) {

        return dersServices.getDersById(id);

    }
    
    @DeleteMapping(path="/delete/{id}")
    @Override
    public void deleteDers(@PathVariable(name="id")Integer id) {

        dersServices.deleteDers(id);

    }

    @PostMapping(path="/bolum-ders-list")
    @Override
    public List<DtoDers> derslerBolumeGore(@RequestBody DtoBolumeGoreDersler dtoBolumeGoreDersler) {
        return dersServices.derslerBolumeGore(dtoBolumeGoreDersler);
    }

    @PostMapping(path="/ders-list-for-ders-programi")
    @Override
    public List<DtoDers> derslerForDersProgrami(@RequestBody DtoDersForDersProgrami dtoDersForDersProgrami) {
        return dersServices.derslerForDersProgrami(dtoDersForDersProgrami);
    }

    @PostMapping(path="/ders-list-bolmvedonem")
    @Override
    public List<DtoDers> derslerDonemeveBolumeGore(@RequestBody DtoBolumaveDonemeGoreDerslerIU dtoBolumaveDonemeGoreDerslerIU) {
        return dersServices.derslerDonemeveBolumeGore(dtoBolumaveDonemeGoreDerslerIU);
    }

    // @PutMapping(path="/update/{id}")
    // @Override
    // public Ders updatedDers(@PathVariable(name="id")Integer id,@RequestBody Ders updatedDers) {

    //     return dersServices.updateDers(id, updatedDers);


    // }

}