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
@Table(name="Fakulte")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class fakulte {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "fakulte_ismi")
    private String fakulte_ismi;

    @Column(name = "kontenjan")
    private Integer kontenjan;

    @Column(name = "aktif_ogrenci")
    private Integer aktif_ogrenci;

    @Column(name = "toplam_ogrenci")
    private Integer toplam_ogrenci;

   
   

}
