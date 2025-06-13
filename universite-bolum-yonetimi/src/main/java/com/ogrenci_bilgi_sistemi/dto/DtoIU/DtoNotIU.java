package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoNotIU {

    private Integer sinavId;

    private Integer gorevliId;

    private String gorevliNot;

}
