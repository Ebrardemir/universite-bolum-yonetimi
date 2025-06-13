package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiWithIcerik;

public interface IDersProgramiController {

    public DtoDersProgramiWithIcerik saveDersProgrami(DtoDersProgramiIU dersProgrami);
}
