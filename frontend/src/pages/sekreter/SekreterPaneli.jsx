import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/sekreter/panel.css';
import logo from '../../images/kou.png';

import CourseSchedule from '../sekreter/CourseSchedule';
import KullaniciKayit from './KullaniciKayit';
import SinavProgramiListe from './sinavProgramiListe';
import OgretimElemanlari from './OgretimElemanlari';
import DersProgramiList from './DersProgramiList';

const AkademikPersonelPaneli = () => {
    const [aktifModul, setAktifModul] = useState();
    const [yetkiliMi, setYetkiliMi] = useState(false);
    const navigate = useNavigate();

    // ✅ Rol kontrolü
    useEffect(() => {
        const rolId = Number(localStorage.getItem('rolId'));
        if (rolId === 2) {
            setYetkiliMi(true);
        } else {
            setYetkiliMi(false);
        }
    }, []);

    const handleLogoutAndRedirect = () => {
        localStorage.removeItem('rolId');
        localStorage.removeItem('userId');
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem("rolId");
        localStorage.removeItem("userId");
        localStorage.clear();
        window.location.href = "/login";
    };

    const renderIcerik = () => {
        switch (aktifModul) {
            case 'ders-programi-islemleri':
                return <DersProgramiList />;
            case 'kullanici-kayit':
                return <KullaniciKayit />;
            case 'sinav-programi-islemleri':
                return <SinavProgramiListe />;
            case 'ogretim-elemanlari':
                return <OgretimElemanlari />;
            default:
                return null;
        }
    };

    // ✅ Yetkisizse uyarı + buton
    if (!yetkiliMi) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Bu sayfaya erişmek için sekreter girişi yapmalısınız.</h2>
                <button
                    onClick={handleLogoutAndRedirect}
                    style={{ padding: '10px 20px', marginTop: '20px' }}
                >
                    Girişe Git
                </button>
            </div>
        );
    }

    return (
        <div className="panel-container">
            <aside className="sidebar">
                <h2 className="panel-title">Sekreter Paneli</h2>
                <img src={logo} alt="KOÜ Logo" />
                <h3>Modüller</h3>
                <ul>
                    <li onClick={() => setAktifModul('ders-programi-islemleri')}>📚 Ders Programı İşlemleri</li>
                    <li onClick={() => setAktifModul('kullanici-kayit')}>👤 Kullanıcı Ekleme</li>
                    <li onClick={() => setAktifModul('sinav-programi-islemleri')}>📝 Sınav Programı İşlemleri</li>
                    <li onClick={() => setAktifModul('ogretim-elemanlari')}>👨‍🏫 Öğretim Elemanları</li>
                    <li onClick={handleLogout} style={{ color: 'red', marginTop: '20px' }}>🚪 Çıkış Yap</li>
                </ul>
            </aside>
            <main className="content-area">
                {renderIcerik()}
            </main>
        </div>
    );
};

export default AkademikPersonelPaneli;
