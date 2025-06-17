package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import java.time.LocalDate;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoSinavTableUI {

    private Integer bolumId;

    private Integer onay;

    private String isim;

    private LocalDate baslangicTarihi;

    private LocalDate bitisTarihi;

    private Integer donem;

}
