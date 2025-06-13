import React, { useState } from 'react';
import '../../css/sekreter/kullaniciKayit.css';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const KullaniciKayit = () => {
    const [formVerisi, formVerisiAyarla] = useState({
        isim: '',
        soyisim: '',
        kullaniciAdi: '',
        sifre: '',
        unvan: '',
        bolumId: 1,
        rolId: 0
    });

    const [kaydedilenKullanici, kaydedilenKullaniciAyarla] = useState(null);

    const degisiklikYakala = (e) => {
        formVerisiAyarla((onceki) => ({
            ...onceki,
            [e.target.name]: e.target.value,
        }));
    };

    const kaydet = async () => {
        try {
            const response = await axios.post(`${API_URL}/rest/api/gorevli/kaydet`, formVerisi);
            kaydedilenKullaniciAyarla(response.data);
            alert("Kullanıcı başarıyla kaydedildi!");
        } catch (error) {
            console.error("Kayıt hatası:", error);
            alert("Kullanıcı kaydedilemedi.");
        }
    };

    return (
        <div className="kapsayici">
            <h2 className="baslik">Yeni Kullanıcı Kaydı</h2>
            <div className="form">
                <input className="girdi" name="isim" placeholder="İsim" onChange={degisiklikYakala} />
                <input className="girdi" name="soyisim" placeholder="Soyisim" onChange={degisiklikYakala} />
                <input className="girdi" name="kullaniciAdi" placeholder="Kullanıcı Adı" onChange={degisiklikYakala} />
                <input className="girdi" name="sifre" type="password" placeholder="Şifre" onChange={degisiklikYakala} />
                <input className="girdi" name="unvan" placeholder="Unvan (Örn: Öğr. Gör.)" onChange={degisiklikYakala} />
                <button className="buton" onClick={kaydet}>Kaydet</button>
            </div>

            {kaydedilenKullanici && (
                <div className="onizleme">
                    <h4>Kaydedilen Kullanıcı:</h4>
                    <p><b>İsim:</b> {kaydedilenKullanici.isim}</p>
                    <p><b>Soyisim:</b> {kaydedilenKullanici.soyisim}</p>
                    <p><b>Kullanıcı Adı:</b> {kaydedilenKullanici.kullaniciAdi}</p>
                    <p><b>Unvan:</b> {kaydedilenKullanici.unvan}</p>
                </div>
            )}
        </div>
    );
};

export default KullaniciKayit;
