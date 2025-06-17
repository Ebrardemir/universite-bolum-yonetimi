package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoDersIU {

    private Integer bolumId;
    private Integer kontenjan;
    private String dersAdi;
    private Integer akts;
    private Integer kredi;
    private Integer saatSayisi;
    private Integer alanKisiSayisi;
    private Integer sinif;
    private Integer donem;


}
