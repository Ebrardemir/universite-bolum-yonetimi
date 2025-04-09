package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.List;
import java.util.Optional;

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

    @Override
    public List<Ders> getAllDers() {
        List<Ders>dersList=dersRepository.findAll();
        return  dersList;
    }

    

    @Override
    public Ders getDersById(Integer id) {
       Optional<Ders>optional= dersRepository.findById(id);
       if(optional.isPresent()){
        return optional.get();
       }
       return null;
    }

    @Override
    public void deleteDers(Integer id) {
        Ders dbDers= getDersById(id);
        if(dbDers!=null){
            dersRepository.delete(dbDers);
        }

       
    }

    @Override
    public Ders updateDers(Integer id, Ders updatedDers) {
        Ders dbDers=getDersById(id);
        if(dbDers!=null){

            
            dbDers.setAkts(updatedDers.getAkts());
            dbDers.setAlan_kisi_sayisi(updatedDers.getAlan_kisi_sayisi());
            dbDers.setBolum(updatedDers.getBolum());
            dbDers.setDers_Adi(updatedDers.getDers_Adi());
            dbDers.setDonem(updatedDers.getDonem());
            dbDers.setKredi(updatedDers.getKredi());
            dbDers.setSaat_sayisi(updatedDers.getSaat_sayisi());
            dbDers.setSinif(updatedDers.getSinif());
            dbDers.setSon_guncelleme_tarihi(updatedDers.getSon_guncelleme_tarihi());
            dbDers.setEklenme_tarihi(updatedDers.getEklenme_tarihi());

            return dersRepository.save(dbDers);

        }
        return null;
    }

}
