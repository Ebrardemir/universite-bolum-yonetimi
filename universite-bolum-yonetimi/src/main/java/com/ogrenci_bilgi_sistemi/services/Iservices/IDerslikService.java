package com.ogrenci_bilgi_sistemi.services.Iservices;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslik;

public interface IDerslikService {

    public List<DtoDerslik> tumDersliklerList();

    public List<DtoDerslik> dersliklerByBolumId(Integer bolumId);

}
