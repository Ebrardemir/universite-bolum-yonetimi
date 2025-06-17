package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoGorevliIU {

    private String isim;

    private String soyisim;

    private String kullaniciAdi;

    private String sifre;

    private Integer bolumId;

    private String unvan;

    private Integer rolId;
}
