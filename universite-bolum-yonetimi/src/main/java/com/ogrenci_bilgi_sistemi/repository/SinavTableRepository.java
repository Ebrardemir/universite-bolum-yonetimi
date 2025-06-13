package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ogrenci_bilgi_sistemi.entities.sinav_table;

public interface SinavTableRepository extends JpaRepository<sinav_table, Integer>{

    List<sinav_table> findByBolumId(Integer bolumId);
}
