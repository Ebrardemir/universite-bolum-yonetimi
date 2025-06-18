package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.ders_programi;

@Repository
public interface DersProgramiRepository extends JpaRepository<ders_programi, Integer>{

    @Query("SELECT d FROM ders_programi d " +
            "WHERE d.bolumId = :bolumId AND d.sinif = :sinif AND d.donem = :donem")
    Optional<ders_programi> findByBolumIdAndSinifAndDonem(
            @Param("bolumId") Integer bolumId,
            @Param("sinif") Integer sinif,
            @Param("donem") Integer donem
    );

    List<ders_programi> findByBolumId(Integer bolumId);
}
