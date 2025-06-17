package com.ogrenci_bilgi_sistemi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.derslik_sira;

import java.util.List;

@Repository
public interface DerslikSiraRepository extends JpaRepository<derslik_sira, Integer> {
    List<derslik_sira> findByDerslikId(Integer derslikId);
}
