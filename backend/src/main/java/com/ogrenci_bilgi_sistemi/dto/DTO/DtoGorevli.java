package com.ogrenci_bilgi_sistemi.dto.DTO;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoGorevli {

    private Integer id;

    private Integer rolId;

    private String isim;

    private String soyisim;

    private String kullaniciAdi;

    private String sifre;

    private Integer bolumId;

    private String unvan;
}
