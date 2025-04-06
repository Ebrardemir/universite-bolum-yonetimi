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

    @Column(name="numara")
    private String numara;

    @Column(name = "Telefon_Numarasi")
    private String telefon_numarasi;

    @Column(name = "Email")
    private String email;
 
    @Column(name = "Kimlik_Numarasi")
    private String kimlik_numarasi;

    @Column(name = "Mezun_Durumu")
    private String mezun_durumu;
    
    @Column(name = "Sinif")
    private String sinif;

    @Column(name = "Bolum")
    private String bolum;

    @Column(name="Fakulte")
    private String fakulte;

    @Column(name="Tamamlanan_Akts")
    private Integer tamamlanan_akts;

    @Column(name = "sifre")
    private String sifre;

    @Column(name = "Giriş_Tarihi")
    private Date giris_tarihi;

    @Column(name = "Mezun_Tarihi")
    private Date mezun_tarihi;

    @Column(name = "Donem")
    private String donem;

    @Column(name = "Ders_Programi_id")
    private Integer ders_programi_id;


}
