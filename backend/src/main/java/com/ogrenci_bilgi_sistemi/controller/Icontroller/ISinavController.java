package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinav;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavIU;

public interface ISinavController {

    public ResponseEntity<?> sinavSave(List<DtoSinavIU> sinavList);

    public List<DtoSinav> sinavListele(Integer sinavId);

    public void sinavListTemizle(Integer sinavId);
}
