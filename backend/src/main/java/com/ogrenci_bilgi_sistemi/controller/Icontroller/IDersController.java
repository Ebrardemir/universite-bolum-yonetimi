package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDers;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoBolumaveDonemeGoreDerslerIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoBolumeGoreDersler;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersForDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersIU;

public interface IDersController {


    public DtoDers saveDers(DtoDersIU ders);

    public List<DtoDers>getAllDers();

    public DtoDers getDersById(Integer id);

    public void deleteDers(Integer id);

    public List<DtoDers> derslerBolumeGore(DtoBolumeGoreDersler dtoBolumeGoreDersler);

    public List<DtoDers> derslerForDersProgrami(DtoDersForDersProgrami dtoDersForDersProgrami);

    public List<DtoDers> derslerDonemeveBolumeGore(DtoBolumaveDonemeGoreDerslerIU dtoBolumaveDonemeGoreDerslerIU);

    // public Ders updatedDers(Integer id,Ders updatedDers);

    

}
