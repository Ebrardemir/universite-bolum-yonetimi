package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiWithIcerik;

import java.util.List;

public interface IDersProgramiController {

    public DtoDersProgrami saveDersProgrami(DtoDersProgramiIU dersProgrami);

    public List<DtoDersProgrami> dersProgramiListByBolumId(Integer bolumId);

    public DtoDersProgrami dersProgramiById(Integer id);
}
