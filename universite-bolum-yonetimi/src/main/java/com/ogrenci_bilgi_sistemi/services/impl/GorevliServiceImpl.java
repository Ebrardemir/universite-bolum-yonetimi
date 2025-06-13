package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoGorevli;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoGirisBilgileri;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoGorevliIU;
import com.ogrenci_bilgi_sistemi.entities.gorevli;
import com.ogrenci_bilgi_sistemi.repository.GorevliRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IGorevliService;

@Service
public class GorevliServiceImpl implements IGorevliService {

    @Autowired
    private GorevliRepository gorevliRepository;

    @Override
    public List<DtoGorevli> OgretimElemanlariList() {
        List<gorevli> gorevliler = gorevliRepository.findAll();

        return gorevliler.stream()
                .filter(g -> g.getRolId() == 3)
                .map(gorevli -> {
                    DtoGorevli dto = new DtoGorevli();
                    BeanUtils.copyProperties(gorevli, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<DtoGorevli> ogretimElemanlariListByBolumId(Integer bolumId) {
        List<gorevli> gorevliList = gorevliRepository.findByBolumId(bolumId);

        return gorevliList.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private DtoGorevli mapToDto(gorevli gorevli) {
        DtoGorevli dto = new DtoGorevli();
        BeanUtils.copyProperties(gorevli, dto);
        return dto;
    }

    @Override
    public DtoGorevli girisYap(DtoGirisBilgileri girisBilgileri) {
        Optional<gorevli> optionalGorevli = gorevliRepository
            .findByKullaniciAdiAndSifre(girisBilgileri.getKullaniciAdi(), girisBilgileri.getSifre());

        if (optionalGorevli.isPresent()) {
            DtoGorevli dto = new DtoGorevli();
            BeanUtils.copyProperties(optionalGorevli.get(), dto);
            return dto;
        } else {
            throw new RuntimeException("Kullanıcı adı veya şifre hatalı.");
    }
}

    @Override
    public DtoGorevli kayit(DtoGorevliIU dtoGorevliIU) {
        gorevli gorevli = new gorevli();
        BeanUtils.copyProperties(dtoGorevliIU, gorevli); // DTO'dan entity'e

        gorevli kayitliGorevli = gorevliRepository.save(gorevli);

        DtoGorevli dto = new DtoGorevli();
        BeanUtils.copyProperties(kayitliGorevli, dto); // Entity'den DTO'ya

        return dto;
    }



}
