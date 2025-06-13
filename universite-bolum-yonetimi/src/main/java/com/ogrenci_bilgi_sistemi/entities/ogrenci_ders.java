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
@Table(name="Ogrenci_Ders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ogrenci_ders {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "ogrenci_id")
    private Integer ogrenciId;

    @Column(name = "ders_id")
    private Integer dersId;

}
