package com.ogrenci_bilgi_sistemi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ogrenci_bilgi_sistemi.entities.oturma_duzeni;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OturmaDuzeniRepository extends JpaRepository<oturma_duzeni, Integer>{

    boolean existsBySinavId(Integer sinavId);

    List<oturma_duzeni> findBySinavId(Integer sinavId);

}
