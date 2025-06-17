package com.ogrenci_bilgi_sistemi.entities;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Ders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ders {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ders_adi")
    private String dersAdi;
    
    @Column(name = "akts")
    private Integer akts;

    @Column(name = "kredi")
    private Integer kredi;

    @Column(name = "saat_sayisi")
    private Integer saatSayisi;

    @Column(name = "sinif")
    private Integer sinif;

    @Column(name = "donem")
    private Integer donem;

    @Column(name="kontenjan")
    private Integer kontenjan;

    @Column(name = "alan_kisi_sayisi")
    private Integer alanKisiSayisi;

    @Column(name="bolum_id")
    private Integer bolumId;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name="eklenme_tarihi")
    private Date eklenmeTarihi;

    @JsonFormat(pattern="yyyy-MM-dd")
    @Column(name = "son_güncelleme_tarihi")
    private Date sonGuncellemeTarihi;

}
