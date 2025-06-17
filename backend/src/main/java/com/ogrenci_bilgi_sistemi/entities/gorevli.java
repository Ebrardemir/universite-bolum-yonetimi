package com.ogrenci_bilgi_sistemi.entities;

import java.math.BigDecimal;
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

    @Column(name = "rol_id")
    private Integer rolId;

    @Column(name = "isim")
    private String isim;

    @Column(name = "soyisim")
    private String soyisim;

    @Column(name = "kullanici_adi")
    private String kullaniciAdi;

    @Column(name = "sifre")
    private String sifre;

    @Column(name = "bolum_id")
    private Integer bolumId;

    @Column(name = "unvan")
    private String unvan;

}
