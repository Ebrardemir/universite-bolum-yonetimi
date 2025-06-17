package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ogrenci_bilgi_sistemi.entities.ogrenci_ders;

public interface OgrenciDersRepository extends JpaRepository<ogrenci_ders, Integer>{

    @Query("SELECT od.ogrenciId FROM ogrenci_ders od WHERE od.dersId = :dersId")
    List<Integer> findOgrenciIdByDersId(@Param("dersId") Integer dersId);

}
