package com.ogrenci_bilgi_sistemi.dto.DTO;

import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoDersProgramiIcerik {

    private Integer id;

    private Integer derslikId;

    private String gun;

    private LocalTime baslangicSaati;

    private LocalTime bitisSaati;

    private Integer saatSayisi;

    private Integer dersId;

    private Integer dersProgramiId;

    private Integer gorevliId;
}
