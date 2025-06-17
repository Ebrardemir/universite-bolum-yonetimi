package com.ogrenci_bilgi_sistemi.controller.impl;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.IDerslikSiraController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDerslikSira;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDerslikSiraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("rest/api/derslik-sira")
public class DerslikSiraControllerImpl implements IDerslikSiraController {

    @Autowired
    private IDerslikSiraService derslikSiraService;

    @GetMapping(path="/{derslikId}/getir-list")
    @Override
    public List<DtoDerslikSira> derslikSiraList(@PathVariable(name="derslikId") Integer derslikId) {
        return derslikSiraService.derslikSiraList(derslikId);
    }
}
