package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinavTable;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavTableUI;

public interface ISinavTableController {

    public DtoSinavTable sinavTableSave(DtoSinavTableUI sinavTableUI);

    public DtoSinavTable sinavTableOnayla(Integer sinavId);

    public List<DtoSinavTable> sinavTableListe(Integer bolumId);

    public DtoSinavTable sinavTableById(Integer id);
}
