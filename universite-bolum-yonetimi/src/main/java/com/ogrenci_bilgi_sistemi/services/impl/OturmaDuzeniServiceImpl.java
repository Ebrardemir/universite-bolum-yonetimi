package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.entities.derslik;
import com.ogrenci_bilgi_sistemi.entities.oturma_duzeni;
import com.ogrenci_bilgi_sistemi.entities.sinav;
import com.ogrenci_bilgi_sistemi.repository.OgrenciDersRepository;
import com.ogrenci_bilgi_sistemi.repository.OturmaDuzeniRepository;
import com.ogrenci_bilgi_sistemi.repository.SinavRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IOturmaDuzeniService;

@Service
public class OturmaDuzeniServiceImpl implements IOturmaDuzeniService{

    @Autowired
    private OgrenciDersRepository ogrenciDersRepository;

    @Autowired
    private OturmaDuzeniRepository oturmaDuzeniRepository;

    @Autowired
    private SinavRepository sinavRepository;

    public void oturmaDuzeniOlustur(Integer sinavId) {
        sinav sinav = sinavRepository.findById(sinavId)
            .orElseThrow(() -> new IllegalArgumentException("Sınav bulunamadı: " + sinavId));

        Integer dersId = sinav.getDersId();

        // Dersi alan öğrencileri getir
        List<Integer> ogrenciIdList = ogrenciDersRepository.findOgrenciIdByDersId(dersId);

        // Rastgele karıştır
        Collections.shuffle(ogrenciIdList);

        // Sınavın atandığı derslikleri al
        List<derslik> derslikler = sinav.getDerslikler();

        int ogrIndex = 0;
        for (derslik d : derslikler) {
            int kapasite = d.getSinavKapasite();

            for (int sira = 1; sira <= kapasite && ogrIndex < ogrenciIdList.size(); sira++) {
                oturma_duzeni od = new oturma_duzeni();
                od.setSinavId(sinavId);
                od.setDerslikId(d.getId());
                od.setSiraNo(sira);
                od.setOgrenciId(ogrenciIdList.get(ogrIndex++));

                oturmaDuzeniRepository.save(od);
            }

            if (ogrIndex >= ogrenciIdList.size()) {
                break;
            }
        }

        if (ogrIndex < ogrenciIdList.size()) {
            throw new RuntimeException("Yetersiz kapasite! Atanamayan öğrenci sayısı: " + (ogrenciIdList.size() - ogrIndex));
        }
    }


}
