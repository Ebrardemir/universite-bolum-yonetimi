package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslikSira;

import java.util.List;

public interface IDerslikSiraController {
    public List<DtoDerslikSira> derslikSiraList(Integer derslikId);
}
