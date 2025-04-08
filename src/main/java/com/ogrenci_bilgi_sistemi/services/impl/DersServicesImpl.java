package com.ogrenci_bilgi_sistemi.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.entities.Ders;
import com.ogrenci_bilgi_sistemi.repository.DersRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersServices;


@Service
public class DersServicesImpl implements IDersServices {

    @Autowired
    private DersRepository dersRepository;

    @Override
    public Ders saveDers(Ders ders) {

       return dersRepository.save(ders);


        
    }

}
