package com.ogrenci_bilgi_sistemi.dto.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoDerslikSira {

    private Integer id;

    private Integer derslikId;

    private Integer siraNo;

    private Integer siraKapasite;

    private Integer siraAdet;
}
