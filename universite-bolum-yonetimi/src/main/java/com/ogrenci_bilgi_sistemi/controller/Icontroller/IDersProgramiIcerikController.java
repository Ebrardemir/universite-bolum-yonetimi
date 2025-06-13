package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgramiIcerik;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIcerikWithDetails;

public interface IDersProgramiIcerikController {

    public List<DtoDersProgramiIcerik> saveDersProgramiList(List<DtoDersProgramiIcerik> dersProgrami);

    public List<DtoDersProgramiIcerikWithDetails> dersProgramiByGorevliId(Integer gorevliId);

    public List<DtoDersProgramiIcerik> dersProgramiByDerslikId(Integer derslikId);
}
