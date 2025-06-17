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
@Table(name="Notlar")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class not {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="sinav_id")
    private Integer sinavId;

    @Column(name="gorevli_id")
    private Integer gorevliId;

    @Column(name="gorevli_not")
    private String gorevliNot;
}
