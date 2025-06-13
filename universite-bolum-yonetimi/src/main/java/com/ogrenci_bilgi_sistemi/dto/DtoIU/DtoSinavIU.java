package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoSinavIU {
    
    private Integer dersId;

    private LocalDate sinavTarih;

    private LocalTime baslangicSaati;

    private LocalTime bitisSaati;

    private List<Integer> derslikIdList;

    private Integer gozetmenId;

    private Integer sinavId;
}
