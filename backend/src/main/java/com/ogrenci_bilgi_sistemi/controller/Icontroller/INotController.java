package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoNot;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoNotIU;

public interface INotController {

    public DtoNot notSaveSinav(DtoNotIU dtoNotIU);

    public List<DtoNot> notGetirSinav(Integer sinavId);

    public DtoNot notSaveDersProgrami(DtoNotIU dtoNotIU);

    public DtoNot notGuncelle(Integer id, DtoNotIU dtoNotIU);

    public List<DtoNot> notGetirDersProgrami(Integer dersProgramiId);
}
