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
@Table(name="Bolum")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class bolum {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "bolum_ismi")
    private String bolum_ismi;

    @Column(name = "kontenjan")
    private Integer kontenjan;

    @Column(name = "aktif_ogrenci")
    private Integer aktif_ogrenci;

    @Column(name = "toplam_ogrenci")
    private Integer toplam_ogrenci;

    @Column(name = "kurulma_tarihi")
    private Date kurulma_tarihi;

    @Column(name="bolum_baskani_id")
    private Integer bolum_baskani_id;


}
