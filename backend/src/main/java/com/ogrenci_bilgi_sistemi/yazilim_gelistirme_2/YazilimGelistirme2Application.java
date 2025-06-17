package com.ogrenci_bilgi_sistemi.yazilim_gelistirme_2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@EntityScan(basePackages = {"com.ogrenci_bilgi_sistemi"})
@ComponentScan(basePackages = {"com.ogrenci_bilgi_sistemi"})
@EnableJpaRepositories(basePackages = {"com.ogrenci_bilgi_sistemi"})
@SpringBootApplication
public class YazilimGelistirme2Application {

	public static void main(String[] args) {
		SpringApplication.run(YazilimGelistirme2Application.class, args);
	}

}
