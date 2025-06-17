package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.ders_programi;

@Repository
public interface DersProgramiRepository extends JpaRepository<ders_programi, Integer>{

    Optional<ders_programi> findByBolumIdAndSinifAndDonem(Integer bolumId, Integer sinif, Integer donem);

    List<ders_programi> findByBolumId(Integer bolumId);
}
