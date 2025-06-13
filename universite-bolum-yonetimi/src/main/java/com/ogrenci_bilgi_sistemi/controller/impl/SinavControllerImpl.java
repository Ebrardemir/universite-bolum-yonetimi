package com.ogrenci_bilgi_sistemi.controller.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ogrenci_bilgi_sistemi.controller.Icontroller.ISinavController;
import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinav;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavIU;
import com.ogrenci_bilgi_sistemi.services.Iservices.ISinavService;

@RestController
@RequestMapping("rest/api/sinav/")
public class SinavControllerImpl implements ISinavController{

    @Autowired
    private ISinavService sinavService;

    @PutMapping(path="save")
    @Override
    public ResponseEntity<?> sinavSave(@RequestBody List<DtoSinavIU> sinavlar) {
        try {
            List<DtoSinav> result = sinavService.sinavSave(sinavlar);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage()); // 400 Bad Request ve açıklayıcı mesaj
        } catch (Exception ex) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Sunucuda beklenmeyen bir hata oluştu.");
        }
    }

    @GetMapping(path="{sinavId}/listele")
    @Override
    public List<DtoSinav> sinavListele(@PathVariable(name="sinavId") Integer sinavId) {
        return sinavService.sinavListele(sinavId);
    }

    @DeleteMapping(path="{sinavId}/sil")
    @Override
    public void sinavListTemizle(@PathVariable(name="sinavId") Integer sinavId) {
        sinavService.sinavListTemizle(sinavId);
    }

}
