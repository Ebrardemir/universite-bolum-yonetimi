package com.ogrenci_bilgi_sistemi.entities;

import java.time.LocalTime;

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

public class ders_programi_icerik {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "derslik_id")
    private Integer derslikId;

    @Column(name="gun")
    private String gun;

    @Column(name="baslangic_saati")
    private LocalTime baslangicSaati;

    @Column(name = "bitis_saati")
    private LocalTime bitisSaati;

    @Column(name = "saat_sayisi")
    private Integer saatSayisi;

    @Column(name = "ders_id")
    private Integer dersId;

    @Column(name = "ders_programi_id")
    private Integer dersProgramiId;

    @Column(name = "gorevli_id")
    private Integer gorevliId;

}
