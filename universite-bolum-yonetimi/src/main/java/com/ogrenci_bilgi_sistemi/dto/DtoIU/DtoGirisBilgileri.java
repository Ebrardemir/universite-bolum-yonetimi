package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoGirisBilgileri {

    private String kullaniciAdi;
    
    private String sifre;
}
