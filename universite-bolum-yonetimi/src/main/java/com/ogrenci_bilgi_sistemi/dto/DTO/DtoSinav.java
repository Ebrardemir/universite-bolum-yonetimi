package com.ogrenci_bilgi_sistemi.dto.DTO;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.ogrenci_bilgi_sistemi.entities.derslik;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoSinav {

    private Integer id;

    private Integer dersId;

    private LocalDate sinavTarih;

    private LocalTime baslangicSaati;

    private LocalTime bitisSaati;

    private List<derslik> derslikler;

    private Integer gozetmenId;

    private Integer sinavId;
}
