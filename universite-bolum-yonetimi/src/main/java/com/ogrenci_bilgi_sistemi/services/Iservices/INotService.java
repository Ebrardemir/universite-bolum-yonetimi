package com.ogrenci_bilgi_sistemi.services.Iservices;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoNot;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoNotIU;

public interface INotService {

    public DtoNot notSave(DtoNotIU dtoNotIU);

    public List<DtoNot> notGetir(Integer sinavId);

}
