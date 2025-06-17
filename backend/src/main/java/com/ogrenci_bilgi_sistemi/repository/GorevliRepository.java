package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.gorevli;

@Repository
public interface GorevliRepository extends JpaRepository<gorevli, Integer>{

    List<gorevli> findByBolumId(Integer bolumId);

    Optional<gorevli> findByKullaniciAdiAndSifre(String kullaniciAdi, String sifre);

}
