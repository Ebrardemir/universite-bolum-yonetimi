import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/sekreter/panel.css';
import logo from '../../images/kou.png';
import CourseSchedule from '../sekreter/CourseSchedule';
import KullaniciKayit from './KullaniciKayit';
import SinavProgramiListe from './sinavProgramiListe';
import OgretimElemanlari from './OgretimElemanlari';



const AkademikPersonelPaneli = () => {
    const [aktifModul, setAktifModul] = useState();
    const navigate = useNavigate();

    const renderIcerik = () => {
        switch (aktifModul) {

            case 'ders-programi-islemleri':
                return <CourseSchedule />
            case 'kullanici-kayit':
                return <KullaniciKayit />

            case 'sinav-programi-islemleri':
                return <SinavProgramiListe />

            case 'ogretim-elemanlari':
                return <OgretimElemanlari />

        }
    };

    return (
        <div className="panel-container">
            <aside className="sidebar">
                <h2 className="panel-title">Sekreter Paneli</h2>
                <img src={logo} alt="KOÜ Logo" />
                <h3>Modüller</h3>
                <ul>
                    <li onClick={() => setAktifModul('ders-programi-islemleri')}>📚 Ders Programı İşlemleri</li>
                    <li onClick={() => setAktifModul('kullanici-kayit')}>📚 Kullanıcı Ekleme</li>
                    <li onClick={() => setAktifModul('sinav-programi-islemleri')}>📚 Sınav Programı İşlemleri</li>
                    <li onClick={() => setAktifModul('ogretim-elemanlari')}>📚 Öğretim Elemanları</li>


                </ul>

            </aside>
            <main className="content-area">
                {renderIcerik()}
            </main>
        </div>
    );
};

export default AkademikPersonelPaneli;
