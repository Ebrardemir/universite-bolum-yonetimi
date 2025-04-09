package com.ogrenci_bilgi_sistemi.controller.Icontroller;

import java.util.List;

import com.ogrenci_bilgi_sistemi.entities.Ders;

public interface IDersController {


    public Ders saveDers(Ders ders);

    public List<Ders>getAllDers();

    public Ders getDersById(Integer id);

    public void deleteDers(Integer id);

    public Ders updatedDers(Integer id,Ders updatedDers);

    

}
