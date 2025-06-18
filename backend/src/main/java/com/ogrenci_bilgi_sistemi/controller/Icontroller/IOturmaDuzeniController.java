package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoOturmaDuzeniOgrenciList;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoOturmaDuzeniIU;

import java.util.List;

public interface IOturmaDuzeniController {

    public void oturmaDuzeniOlustur(Integer sinavId);

    public List<DtoOturmaDuzeniOgrenciList> oturmaDuzeniGetirList(Integer sinavId);

    public List<DtoOturmaDuzeniOgrenciList> oturmaDuzeniGuncelle(List<DtoOturmaDuzeniIU> dtoOturmaDuzeniIUS);
}
