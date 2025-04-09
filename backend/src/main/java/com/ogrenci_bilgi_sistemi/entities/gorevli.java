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
@Table(name="Gorevli")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class gorevli {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "rol")
    private String rol;

    @Column(name = "isim")
    private String isim;

    @Column(name = "soyisim")
    private String soyisim;

    @Column(name = "kullanici_adi")
    private String kullanici_adi;

    @Column(name = "sifre")
    private String sifre;

    @Column(name = "giris_tarihi")
    private Date giris_tarihi;

    @Column(name = "cikis_tarihi")
    private Date cikis_tarihi;

    @Column(name = "maas")
    private Integer maas;

    @Column(name = "aktiflik")
    private String aktiflik;

    @Column(name = "bolum")
    private String bolum;

    @Column(name = "fakulte")
    private String  fakulte;

    @Column(name = "unvan")
    private String unvan;


}
