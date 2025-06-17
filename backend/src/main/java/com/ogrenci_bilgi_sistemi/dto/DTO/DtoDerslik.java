package com.ogrenci_bilgi_sistemi.dto.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoDerslik {

    private Integer id;

    private String derslikAdi;

    private String fakulte;

    private Integer bolumId;

    private Integer kapasite;

    private Integer siraSayisi;
}
