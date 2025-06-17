package com.ogrenci_bilgi_sistemi.entities;

import java.util.Date;


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
@Table(name="Ogrenci")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ogrenci {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name="isim")
    private String isim;

    @Column(name = "soyisim")
    private String soyisim;
    
    @Column(name = "sinif")
    private Integer sinif;

    @Column(name = "bolum_id")
    private Integer bolumId;

    @Column(name = "sifre")
    private String sifre;

    @Column(name = "donem")
    private Integer donem;

    @Column(name = "ders_programi_id")
    private Integer dersProgramiId;
}
