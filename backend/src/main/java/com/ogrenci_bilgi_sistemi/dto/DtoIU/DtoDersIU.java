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

    private String ders_Adi;
    private Integer akts;
    private Integer kredi;
    private Integer saat_sayisi;
    private Integer alan_kisi_sayisi;
    private Date eklenme_tarihi;
    private Date son_guncelleme_tarihi;


}
