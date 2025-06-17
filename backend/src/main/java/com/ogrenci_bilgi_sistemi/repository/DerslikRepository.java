package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.derslik;

@Repository
public interface DerslikRepository extends JpaRepository<derslik, Integer>{

    List<derslik> findByBolumId(Integer bolumId);
}
