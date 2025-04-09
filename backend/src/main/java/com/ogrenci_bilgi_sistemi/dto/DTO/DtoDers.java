package com.ogrenci_bilgi_sistemi.dto.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DtoDers {
    
    private Integer id;
    private String ders_Adi;
    private Integer saat_sayisi;
    private Integer alan_kisi_sayisi;

}
