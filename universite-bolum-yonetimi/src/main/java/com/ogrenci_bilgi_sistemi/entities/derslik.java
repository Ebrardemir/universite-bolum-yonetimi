package com.ogrenci_bilgi_sistemi.entities;

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
@Table(name="Derslik")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class derslik {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "derslik_adi")
    private String derslikAdi;

    @Column(name = "fakulte")
    private String fakulte;

    @Column(name = "bolum_id")
    private Integer bolumId;

    @Column(name = "kapasite")
    private Integer kapasite;

    @Column(name = "sinav_kapasite")
    private Integer sinavKapasite;
}
