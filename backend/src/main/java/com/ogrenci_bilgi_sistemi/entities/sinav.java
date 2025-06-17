package com.ogrenci_bilgi_sistemi.entities;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Sinav")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class sinav {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="sinav_id")
    private Integer sinavId;
    
    @Column(name = "ders_id")
    private Integer dersId;

    @Column(name = "sinav_tarih")
    private LocalDate sinavTarih;

    @Column(name="baslangic_saati")
    private LocalTime baslangicSaati;

    @Column(name="bitis_saati")
    private LocalTime bitisSaati;

    @ManyToMany
    @JoinTable(
        name = "sinav_derslikleri",
        joinColumns = @JoinColumn(name = "sinav_id"),
        inverseJoinColumns = @JoinColumn(name = "derslik_id")
    )
    private List<derslik> derslikler;


    @Column(name = "gozetmen_id")
    private Integer gozetmenId;
}
