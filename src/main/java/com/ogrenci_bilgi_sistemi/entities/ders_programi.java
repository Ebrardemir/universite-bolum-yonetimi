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
@Table(name="Ders_programi")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ders_programi {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="bolum")
    private String bolum;

    @Column(name = "sinif")
    private String sinif;

    @Column(name = "donem")
    private String donem;

}
