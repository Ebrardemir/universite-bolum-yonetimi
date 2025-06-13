package com.ogrenci_bilgi_sistemi.dto.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoNot {

    private Integer id;

    private Integer sinavId;

    private Integer gorevliId;

    private String gorevliNot;
}
