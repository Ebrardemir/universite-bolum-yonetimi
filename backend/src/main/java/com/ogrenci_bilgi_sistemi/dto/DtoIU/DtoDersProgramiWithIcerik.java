package com.ogrenci_bilgi_sistemi.dto.DtoIU;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DtoDersProgramiWithIcerik {

    private Integer id;
    private Integer bolumId;
    private Integer sinif;
    private Integer donem;
    private List<DtoDersProgramiIcerikWithDetails> icerikList;
}
