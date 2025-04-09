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
@Table(name="Ders_programi_icerik")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ders_prograni_icerik {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "derslik_id")
    private Integer derslik_id;

    @Column(name="gun")
    private Date gun;

    @Column(name="baslangic_saati")
    private Date baslangic_saati;

    @Column(name = "bitis_saati")
    private Date bitis_saati;

    @Column(name = "saat_sayisi")
    private Integer saat_sayisi;

    @Column(name = "ders_id")
    private Integer ders_id;

    @Column(name = "ders_programi_id")
    private Integer ders_programi_id;

    @Column(name = "ogretmen_id")
    private Integer ogretmen_id;

}
