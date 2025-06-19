package com.ogrenci_bilgi_sistemi.services.Iservices;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinav;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavIU;

public interface ISinavService {

    public List<DtoSinav> sinavSave(List<DtoSinavIU> sinavList);

    public List<DtoSinav> sinavListele(Integer sinavId);

    public void sinavListTemizle(Integer sinavId);

    public List<DtoSinav> sinavListByGozetmenId(Integer gozetmenId);
}
