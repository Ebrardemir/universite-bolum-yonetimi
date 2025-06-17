package com.ogrenci_bilgi_sistemi.repository;

import com.ogrenci_bilgi_sistemi.entities.Ogrenci;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OgrenciRepository extends JpaRepository<Ogrenci, Integer> {
}
