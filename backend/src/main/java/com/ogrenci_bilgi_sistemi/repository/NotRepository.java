package com.ogrenci_bilgi_sistemi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.not;

@Repository
public interface NotRepository extends JpaRepository<not, Integer>{

    List<not> findBySinavId(Integer sinavId);

    List<not> findByDersProgramiIcerikId(Integer dersProgramiIcerikId);

}
