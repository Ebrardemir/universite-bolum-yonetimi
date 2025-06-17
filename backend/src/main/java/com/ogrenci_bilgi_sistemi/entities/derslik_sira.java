package com.ogrenci_bilgi_sistemi.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Derslik_Sira")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class derslik_sira {
    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="derslik_id")
    private Integer derslikId;

    @Column(name="sira_no")
    private Integer siraNo;

    @Column(name="sira_kapasite")
    private Integer siraKapasite;

    @Column(name="sira_adet")
    private Integer siraAdet;


}
