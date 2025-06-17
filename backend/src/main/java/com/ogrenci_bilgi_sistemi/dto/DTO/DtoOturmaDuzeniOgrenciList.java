package com.ogrenci_bilgi_sistemi.dto.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoOturmaDuzeniOgrenciList {

    private Integer id;

    private Integer sinavId;

    private Integer derslikId;

    private Integer siraNo;

    private Integer ogrenciId;

    private String ogreniIsim;

    private String ogrenciSoyadi;

    private String derslikAdi;

    private String sinavDersAdi;
}
