package com.ogrenci_bilgi_sistemi.services.Iservices;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgrami;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIU;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiWithIcerik;

public interface IDersProgramiService {

    public DtoDersProgramiWithIcerik saveDersProgrami(DtoDersProgramiIU dersProgrami);
}
