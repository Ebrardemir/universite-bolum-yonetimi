package com.ogrenci_bilgi_sistemi.services.Iservices;

import java.util.List;

import com.ogrenci_bilgi_sistemi.entities.Ders;

public interface IDersServices {

    //public DtoDers saveDers(DtoDersIU ders);

    public Ders saveDers(Ders ders);
    
    public List<Ders> getAllDers();

    public void deleteDers(Integer id);

    public Ders getDersById(Integer id);

    public Ders updateDers(Integer id,Ders updatedDers);



}
