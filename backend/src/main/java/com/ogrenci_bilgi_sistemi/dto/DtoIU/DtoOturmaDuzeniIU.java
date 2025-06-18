package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoOturmaDuzeniIU {
    private Integer id;

    private Integer siraNo;

    private Integer ogrenciId;

    private Integer derslikId;
}
