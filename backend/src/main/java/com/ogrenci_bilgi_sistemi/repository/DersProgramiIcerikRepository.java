package com.ogrenci_bilgi_sistemi.repository;

import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ogrenci_bilgi_sistemi.entities.ders_programi_icerik;

@Repository
public interface DersProgramiIcerikRepository extends JpaRepository<ders_programi_icerik, Integer> {

    // 🔁 Dönemsiz derslik doluluk kontrolü
    @Query("""
        SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END
        FROM ders_programi_icerik d
        WHERE d.derslikId = :derslikId
        AND d.gun = :gun
        AND (:baslangicSaati < d.bitisSaati AND :bitisSaati > d.baslangicSaati)
    """)
    boolean existsByDerslikIdAndGunAndZamanAraligi(
        @Param("derslikId") Integer derslikId,
        @Param("gun") String gun,
        @Param("baslangicSaati") LocalTime baslangicSaati,
        @Param("bitisSaati") LocalTime bitisSaati
    );

    // 🔁 Dönemsiz öğretmen çakışma kontrolü
    @Query("""
        SELECT CASE WHEN COUNT(d) > 0 THEN true ELSE false END
        FROM ders_programi_icerik d
        WHERE d.gorevliId = :gorevliId
        AND d.gun = :gun
        AND (:baslangicSaati < d.bitisSaati AND :bitisSaati > d.baslangicSaati)
    """)
    boolean existsByGorevliIdAndGunAndZamanAraligi(
        @Param("gorevliId") Integer gorevliId,
        @Param("gun") String gun,
        @Param("baslangicSaati") LocalTime baslangicSaati,
        @Param("bitisSaati") LocalTime bitisSaati
    );

    List<ders_programi_icerik> findByDersProgramiId(Integer dersProgramiId);

    List<ders_programi_icerik> findByGorevliId(Integer gorevliId);

    List<ders_programi_icerik> findByDerslikId(Integer derslikId);

    @Query("SELECT d.id FROM ders_programi_icerik d WHERE d.dersProgramiId = :dersProgramiId")
    List<Integer> findIdsByDersProgramiId(Integer dersProgramiId);

    // ✅ ID listesine göre sil
    void deleteAllByIdIn(List<Integer> ids);

    // (İsteğe bağlı) dersProgramiId ile hepsini silmek istersen:
    void deleteByDersProgramiId(Integer dersProgramiId);

}
