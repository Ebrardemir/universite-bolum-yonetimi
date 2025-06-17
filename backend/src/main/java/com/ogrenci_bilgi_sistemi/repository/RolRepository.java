package com.ogrenci_bilgi_sistemi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.rol;

@Repository
public interface RolRepository extends JpaRepository<rol, Integer>{

}
