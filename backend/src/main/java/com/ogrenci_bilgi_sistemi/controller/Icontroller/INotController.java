package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoNot;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoNotIU;

public interface INotController {

    public DtoNot notSave(DtoNotIU dtoNotIU);

    public List<DtoNot> notGetir(Integer sinavId);
}
