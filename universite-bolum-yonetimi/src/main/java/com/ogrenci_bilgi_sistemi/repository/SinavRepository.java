package com.ogrenci_bilgi_sistemi.repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.sinav;

@Repository
public interface SinavRepository extends JpaRepository<sinav, Integer> {

    // DERSLİK çakışma kontrolü (ManyToMany derslikler JOIN)
    @Query("""
        SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
        FROM sinav s
        JOIN s.derslikler d
        WHERE d.id = :derslikId
        AND s.sinavTarih = :tarih
        AND (:baslangic < s.bitisSaati AND :bitis > s.baslangicSaati)
    """)
    boolean existsByDerslikIdAndSinavTarihAndSaatAralik(
        @Param("derslikId") Integer derslikId,
        @Param("tarih") LocalDate sinavTarih,
        @Param("baslangic") LocalTime baslangicSaati,
        @Param("bitis") LocalTime bitisSaati
    );

    // GÖZETMEN çakışma kontrolü
    @Query("""
        SELECT CASE WHEN COUNT(s) > 0 THEN true ELSE false END
        FROM sinav s
        WHERE s.gozetmenId = :gozetmenId
        AND s.sinavTarih = :tarih
        AND (:baslangic < s.bitisSaati AND :bitis > s.baslangicSaati)
    """)
    boolean existsByGozetmenIdAndSinavTarihAndSaatAralik(
        @Param("gozetmenId") Integer gozetmenId,
        @Param("tarih") LocalDate sinavTarih,
        @Param("baslangic") LocalTime baslangicSaati,
        @Param("bitis") LocalTime bitisSaati
    );

    List<sinav> findBySinavId(Integer sinavId);

    void deleteBySinavId(Integer sinavId);
}
