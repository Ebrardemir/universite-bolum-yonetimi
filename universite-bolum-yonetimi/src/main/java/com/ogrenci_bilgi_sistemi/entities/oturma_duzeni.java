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
@Table(name="Oturma_duzeni")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class oturma_duzeni {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "sinav_id")
    private Integer sinavId;

    @Column(name = "derslik_id")
    private Integer derslikId;

    @Column(name = "sira_no")
    private Integer siraNo;

    @Column(name = "ogrenci_id")
    private Integer ogrenciId;
}
