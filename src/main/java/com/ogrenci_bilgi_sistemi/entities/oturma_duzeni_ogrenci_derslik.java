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
@Table(name="Oturma_duzeni_ogrenci_derslik")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class oturma_duzeni_ogrenci_derslik {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "derslik_id")
    private Integer derslik_id;

    @Column(name = "sira_no")
    private Integer sira_no;

    @Column(name = "ogrenci_id")
    private Integer ogrenci_id;

    @Column(name = "oturma_duzeni_id")
    private Integer oturma_duzeni_id;


}
