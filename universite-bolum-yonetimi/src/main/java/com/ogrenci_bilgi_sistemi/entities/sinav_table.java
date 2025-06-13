package com.ogrenci_bilgi_sistemi.entities;

import java.time.LocalDate;

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
@Table(name="Sinav_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class sinav_table {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sinavId;

    @Column(name="isim")
    private String isim;

    @Column(name="bolum_id")
    private Integer bolumId;

    @Column(name="onay")
    private Integer onay;

    @Column(name="baslangic_tarihi")
    private LocalDate baslangicTarihi;

    @Column(name="bitis_tarihi")
    private LocalDate bitisTarihi;

    @Column(name="donem")
    private Integer donem;

}
