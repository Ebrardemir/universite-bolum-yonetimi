package com.ogrenci_bilgi_sistemi.services.Iservices;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoGorevli;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoGirisBilgileri;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoGorevliIU;

public interface IGorevliService {

    public List<DtoGorevli> OgretimElemanlariList();

    public List<DtoGorevli> ogretimElemanlariListByBolumId(Integer bolumId);

    public DtoGorevli girisYap(DtoGirisBilgileri girisBilgileri);

    public DtoGorevli kayit(DtoGorevliIU dtoGorevliIU);
}
