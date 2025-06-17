package com.ogrenci_bilgi_sistemi.services.Iservices;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoOturmaDuzeniOgrenciList;

import java.util.List;

public interface IOturmaDuzeniService {

    public void oturmaDuzeniOlustur(Integer sinavId);

    public List<DtoOturmaDuzeniOgrenciList> oturmaDuzeniGetirList(Integer sinavId);
}
