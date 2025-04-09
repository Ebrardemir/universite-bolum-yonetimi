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
@Table(name="Sinav_derslik")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class sinav_derslik {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "sinav_id")
    private Integer sinav_id;

    @Column(name = "derslik_id")
    private Integer derslik_id;

}
