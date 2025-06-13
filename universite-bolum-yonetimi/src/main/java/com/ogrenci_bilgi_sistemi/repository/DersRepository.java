package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.Ders;


@Repository
public interface DersRepository extends JpaRepository<Ders,Integer>{

    List<Ders> findByBolumIdAndSinifAndDonem(Integer bolumId, Integer sinif, Integer donem);

    List<Ders> findByBolumIdAndDonem(Integer bolumId, Integer donem);

}
