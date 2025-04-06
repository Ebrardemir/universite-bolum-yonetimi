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
@Table(name="Ders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ders {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "Ders_Adı")
    private String ders_Adi;
    
    @Column(name = "Akts")
    private Integer akts;
 
    @Column(name = "Kredi")
    private Integer kredi;

    @Column(name = "Saat_Sayısı")
    private Integer saat_sayisi;
    
    @Column(name="Eklenme_Tarihi")
    private Date eklenme_tarihi;
 
    @Column(name = "Son_Güncelleme_Tarihi")
    private Date son_guncelleme_tarihi;

}
