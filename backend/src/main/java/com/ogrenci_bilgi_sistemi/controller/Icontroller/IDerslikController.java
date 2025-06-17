package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslik;

public interface IDerslikController {

    public List<DtoDerslik> tumDersliklerList();

    public List<DtoDerslik> dersliklerByBolumId(Integer bolumId);
}
