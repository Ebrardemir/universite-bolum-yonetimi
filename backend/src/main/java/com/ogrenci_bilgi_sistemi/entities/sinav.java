package com.ogrenci_bilgi_sistemi.entities;
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
@Table(name="Sinav")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class sinav {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name = "ders_id")
    private Integer ders_id;

    @Column(name = "baslangic_tarihi")
    private Date baslangic_tarihi;

    @Column(name = "bitis_tarihi")
    private Date bitis_tarihi;

}
