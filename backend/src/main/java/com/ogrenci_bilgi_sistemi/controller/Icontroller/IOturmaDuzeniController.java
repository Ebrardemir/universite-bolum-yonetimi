package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoOturmaDuzeniOgrenciList;

import java.util.List;

public interface IOturmaDuzeniController {

    public void oturmaDuzeniOlustur(Integer sinavId);

    public List<DtoOturmaDuzeniOgrenciList> oturmaDuzeniGetirList(Integer sinavId);
}
