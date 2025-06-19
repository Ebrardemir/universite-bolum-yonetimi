package com.ogrenci_bilgi_sistemi.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ogrenci_bilgi_sistemi.dto.DTO.DtoDersProgramiIcerik;
import com.ogrenci_bilgi_sistemi.dto.DtoIU.DtoDersProgramiIcerikWithDetails;
import com.ogrenci_bilgi_sistemi.entities.Ders;
import com.ogrenci_bilgi_sistemi.entities.ders_programi;
import com.ogrenci_bilgi_sistemi.entities.ders_programi_icerik;
import com.ogrenci_bilgi_sistemi.entities.gorevli;
import com.ogrenci_bilgi_sistemi.repository.DersProgramiIcerikRepository;
import com.ogrenci_bilgi_sistemi.repository.DersProgramiRepository;
import com.ogrenci_bilgi_sistemi.repository.DersRepository;
import com.ogrenci_bilgi_sistemi.repository.DerslikRepository;
import com.ogrenci_bilgi_sistemi.repository.GorevliRepository;
import com.ogrenci_bilgi_sistemi.services.Iservices.IDersProgramiIcerikService;

@Service
public class DersProgramiIcerikServiceImpl implements IDersProgramiIcerikService {

    @Autowired
    private DersProgramiRepository dersProgramiRepository;

    @Autowired
    private DersProgramiIcerikRepository dersProgramiIcerikRepository;

    @Autowired
    private DersRepository dersRepository;

    @Autowired
    private DerslikRepository derslikRepository;

    @Autowired
    private GorevliRepository gorevliRepository;

    @Override
    @Transactional
    public List<DtoDersProgramiIcerik> saveDersProgramiList(List<DtoDersProgramiIcerik> dtoList, Integer id) {
        if (id == null) {
            throw new IllegalArgumentException("Path parametre dersProgramiId null olamaz!");
        }

        // 1️⃣ Her durumda önce o programa ait eski içerikleri sil
        dersProgramiIcerikRepository.deleteByDersProgramiId(id);

        // 2️⃣ Eğer liste boşsa: sadece silme yap, bitir
        if (dtoList == null || dtoList.isEmpty()) {
            return List.of(); // veya Collections.emptyList()
        }

        // 3️⃣ Liste doluysa: her birini kontrol + kayıt et
        List<DtoDersProgramiIcerik> savedList = dtoList.stream().map(dto -> {
            // Path parametre id ve body içindeki dersProgramiId uyumlu mu?
            if (!id.equals(dto.getDersProgramiId())) {
                throw new IllegalArgumentException("Path parametre ile body içindeki dersProgramiId eşleşmiyor!");
            }

            // A) Program var mı
            dersProgramiRepository.findById(dto.getDersProgramiId())
                    .orElseThrow(() -> new IllegalArgumentException("ders_programi_id bulunamadı: " + dto.getDersProgramiId()));

            // B) Kapasite kontrolü
            int alanKisiSayisi = dersRepository.findById(dto.getDersId())
                    .orElseThrow(() -> new IllegalArgumentException("Ders bulunamadı: " + dto.getDersId()))
                    .getAlanKisiSayisi();

            int kapasite = derslikRepository.findById(dto.getDerslikId())
                    .orElseThrow(() -> new IllegalArgumentException("Derslik bulunamadı: " + dto.getDerslikId()))
                    .getKapasite();

            if (alanKisiSayisi > kapasite) {
                throw new IllegalArgumentException("Derslik kapasitesi yetersiz: " + kapasite + ", Gerekli: " + alanKisiSayisi);
            }

            // C) Çakışma kontrolü
            boolean derslikDolu = dersProgramiIcerikRepository.existsByDerslikIdAndGunAndZamanAraligi(
                    dto.getDerslikId(), dto.getGun(), dto.getBaslangicSaati(), dto.getBitisSaati());

            boolean ogretmenDolu = dersProgramiIcerikRepository.existsByGorevliIdAndGunAndZamanAraligi(
                    dto.getGorevliId(), dto.getGun(), dto.getBaslangicSaati(), dto.getBitisSaati());

            if (derslikDolu) {
                throw new IllegalArgumentException("Derslik bu saatte dolu: " + dto.getBaslangicSaati() + " - " + dto.getBitisSaati());
            }

            if (ogretmenDolu) {
                throw new IllegalArgumentException("Öğretmenin bu saatte dersi var: " + dto.getBaslangicSaati() + " - " + dto.getBitisSaati());
            }

            // D) Kaydet
            ders_programi_icerik entity = new ders_programi_icerik();
            BeanUtils.copyProperties(dto, entity);
            ders_programi_icerik saved = dersProgramiIcerikRepository.save(entity);

            DtoDersProgramiIcerik savedDto = new DtoDersProgramiIcerik();
            BeanUtils.copyProperties(saved, savedDto);
            return savedDto;
        }).collect(Collectors.toList());

        return savedList;
    }




    @Override
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiByGorevliId(Integer gorevliId) {
        List<ders_programi_icerik> icerikList = dersProgramiIcerikRepository.findByGorevliId(gorevliId);

        if (icerikList.isEmpty()) {
            return List.of();
        }

        Optional<gorevli> gorevliOpt = gorevliRepository.findById(gorevliId);
        if (gorevliOpt.isEmpty()) {
            throw new RuntimeException("Görevli bulunamadı.");
        }
        var gorevli = gorevliOpt.get();

        List<DtoDersProgramiIcerikWithDetails> dtoList = new ArrayList<>();

        for (ders_programi_icerik icerik : icerikList) {
            String dersAdi = dersRepository.findById(icerik.getDersId())
                    .map(Ders::getDersAdi)
                    .orElse("Ders Adı Bulunamadı");

            Integer alanKisiSayisi = dersRepository.findById(icerik.getDersId())
                    .map(Ders::getAlanKisiSayisi).orElse(0);

            String derslikAdi = derslikRepository.findById(icerik.getDerslikId())
                    .map(d -> d.getDerslikAdi())
                    .orElse("Derslik Bulunamadı");

            Integer kapasite = derslikRepository.findById(icerik.getDerslikId())
                    .map(d -> d.getKapasite())
                    .orElse(0);

            DtoDersProgramiIcerikWithDetails dto = new DtoDersProgramiIcerikWithDetails(
                    icerik.getId(),
                    icerik.getGorevliId(),
                    icerik.getDerslikId(),
                    icerik.getDersId(),
                    icerik.getGun(),
                    icerik.getBaslangicSaati(),
                    icerik.getBitisSaati(),
                    icerik.getSaatSayisi(),
                    dersAdi,
                    gorevli.getUnvan(),
                    gorevli.getIsim(),
                    gorevli.getSoyisim(),
                    derslikAdi,
                    alanKisiSayisi,
                    kapasite
            );

            dtoList.add(dto);
        }

        return dtoList;
    }




    @Override
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiByDerslikId(Integer derslikId) {
        List<ders_programi_icerik> icerikList = dersProgramiIcerikRepository.findByDerslikId(derslikId);

        if (icerikList.isEmpty()) {
            return List.of();
        }

        List<DtoDersProgramiIcerikWithDetails> dtoList = new ArrayList<>();

        for (ders_programi_icerik icerik : icerikList) {
            String dersAdi = dersRepository.findById(icerik.getDersId())
                    .map(Ders::getDersAdi)
                    .orElse("Ders Adı Bulunamadı");

            Integer alanKisiSayisi = dersRepository.findById(icerik.getDersId())
                    .map(Ders::getAlanKisiSayisi).orElse(0);

            String unvan = "", isim = "", soyisim = "";
            Optional<gorevli> gOpt = gorevliRepository.findById(icerik.getGorevliId());
            if (gOpt.isPresent()) {
                unvan = gOpt.get().getUnvan();
                isim = gOpt.get().getIsim();
                soyisim = gOpt.get().getSoyisim();
            } else {
                unvan = "Görevli";
                isim = "Bulunamadı";
                soyisim = "";
            }

            String derslikAdi = derslikRepository.findById(icerik.getDerslikId())
                    .map(d -> d.getDerslikAdi())
                    .orElse("Derslik Bulunamadı");

            Integer kapasite = derslikRepository.findById(icerik.getDerslikId())
                    .map(d -> d.getKapasite())
                    .orElse(0);

            DtoDersProgramiIcerikWithDetails dto = new DtoDersProgramiIcerikWithDetails(
                    icerik.getId(),
                    icerik.getGorevliId(),
                    icerik.getDerslikId(),
                    icerik.getDersId(),
                    icerik.getGun(),
                    icerik.getBaslangicSaati(),
                    icerik.getBitisSaati(),
                    icerik.getSaatSayisi(),
                    dersAdi,
                    unvan,
                    isim,
                    soyisim,
                    derslikAdi,
                    alanKisiSayisi,
                    kapasite
            );

            dtoList.add(dto);
        }

        return dtoList;
    }



    @Override
    public List<DtoDersProgramiIcerikWithDetails> dersProgramiIcerikByDersProgramiId(Integer dersProgramiId) {
        List<ders_programi_icerik> icerikList = dersProgramiIcerikRepository.findByDersProgramiId(dersProgramiId);

        return icerikList.stream().map(icerik -> {
            String dersAdi = dersRepository.findById(icerik.getDersId())
                    .map(Ders::getDersAdi)
                    .orElse("Ders Adı Bulunamadı");

            Integer alanKisiSayisi = dersRepository.findById(icerik.getDersId())
                    .map(Ders::getAlanKisiSayisi).orElse(0);

            String unvan = "", isim = "", soyisim = "";
            Optional<gorevli> gOpt = gorevliRepository.findById(icerik.getGorevliId());
            if (gOpt.isPresent()) {
                unvan = gOpt.get().getUnvan();
                isim = gOpt.get().getIsim();
                soyisim = gOpt.get().getSoyisim();
            } else {
                unvan = "Görevli";
                isim = "Bulunamadı";
                soyisim = "";
            }

            String derslikAdi = derslikRepository.findById(icerik.getDerslikId())
                    .map(d -> d.getDerslikAdi())
                    .orElse("Derslik Bulunamadı");

            Integer kapasite = derslikRepository.findById(icerik.getDerslikId())
                    .map(d -> d.getKapasite())
                    .orElse(0);

            return new DtoDersProgramiIcerikWithDetails(
                    icerik.getId(),
                    icerik.getGorevliId(),
                    icerik.getDerslikId(),
                    icerik.getDersId(),
                    icerik.getGun(),
                    icerik.getBaslangicSaati(),
                    icerik.getBitisSaati(),
                    icerik.getSaatSayisi(),
                    dersAdi,
                    unvan,
                    isim,
                    soyisim,
                    derslikAdi,
                    alanKisiSayisi,
                    kapasite
            );
        }).collect(Collectors.toList());
    }




}
