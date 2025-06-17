package com.ogrenci_bilgi_sistemi.dto.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoDers {

    private Integer id;

    private String dersAdi;

    private Integer akts;

    private Integer kredi;

    private Integer saatSayisi;

    private Integer sinif;

    private Integer donem;

    private Integer kontenjan;

    private Integer alanKisiSayisi;

    private Integer bolumId;

}
