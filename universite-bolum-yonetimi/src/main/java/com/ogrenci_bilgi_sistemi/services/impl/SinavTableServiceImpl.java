package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoSinavTable;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoSinavTableUI;
import com.ogrenci_bilgi_sistemi.entities.sinav_table;
import com.ogrenci_bilgi_sistemi.repository.SinavTableRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.ISinavTableService;

@Service
public class SinavTableServiceImpl implements ISinavTableService {

    @Autowired
    private SinavTableRepository sinavTableRepository;

    @Override
    public DtoSinavTable sinavTableSave(DtoSinavTableUI sinavTableUI) {
        sinav_table newEntity = new sinav_table();
        BeanUtils.copyProperties(sinavTableUI, newEntity);

        sinav_table saved = sinavTableRepository.save(newEntity);

        DtoSinavTable dto = new DtoSinavTable();
        BeanUtils.copyProperties(saved, dto);

        return dto;
    }


    @Override
    public DtoSinavTable sinavTableOnayla(Integer sinavId) {
        // 1. ID'ye göre sınavı bul
        Optional<sinav_table> optional = sinavTableRepository.findById(sinavId);

        // 2. Eğer sınav bulunamazsa hata fırlat
        if (optional.isEmpty()) {
            throw new IllegalArgumentException("Belirtilen ID'ye ait sınav tablosu bulunamadı!");
        }

        // 3. Sınav bulundu, onay alanını güncelle
        sinav_table sinav = optional.get();
        sinav.setOnay(1); // Onaylandı

        // 4. Güncellenmiş hali kaydet
        sinav_table updatedSinav = sinavTableRepository.save(sinav);

        // 5. Dto'ya dönüştür
        DtoSinavTable result = new DtoSinavTable();
        BeanUtils.copyProperties(updatedSinav, result);

        return result;
    }

    @Override
    public List<DtoSinavTable> sinavTableListe(Integer bolumId) {
        List<sinav_table> sinavlar = sinavTableRepository.findByBolumId(bolumId); // veya findByBolum_Id

        List<DtoSinavTable> dtoListesi = new ArrayList<>();
        for (sinav_table sinav : sinavlar) {
            DtoSinavTable dto = new DtoSinavTable();
            BeanUtils.copyProperties(sinav, dto); // Spring'in BeanUtils'i
            dtoListesi.add(dto);
        }

        return dtoListesi;
    }


    @Override
    public DtoSinavTable sinavTableById(Integer id) {
        Optional<sinav_table> optionalSinav = sinavTableRepository.findById(id);

        if (optionalSinav.isPresent()) {
            sinav_table entity = optionalSinav.get();
            DtoSinavTable dto = new DtoSinavTable();
            BeanUtils.copyProperties(entity, dto);
            return dto;
        } else {
            throw new RuntimeException("Sinav bulunamadı. ID: " + id);
        }
    }




}
