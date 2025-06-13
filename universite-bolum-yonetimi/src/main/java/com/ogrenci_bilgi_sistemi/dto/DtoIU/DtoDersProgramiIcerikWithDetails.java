package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoDersProgramiIcerikWithDetails {

    private String gun;
    private LocalTime baslangicSaati;
    private LocalTime bitisSaati;
    private Integer saatSayisi;
    private String dersAdi;
    private String unvan;
    private String isim;
    private String soyisim;
    private String derslikAdi;
}
