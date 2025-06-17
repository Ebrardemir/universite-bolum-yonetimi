package com.ogrenci_bilgi_sistemi.services.Iservices;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslikSira;

import java.util.List;

public interface IDerslikSiraService {
    public List<DtoDerslikSira> derslikSiraList(Integer derslikId);
}
