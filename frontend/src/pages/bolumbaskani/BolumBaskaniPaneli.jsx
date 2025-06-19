import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import KullaniciYetkilendirme from './KullaniciYetkilendirme';
import '../../css/bolumbaskani/panelLayout.css';
import logo from '../../images/kou.png';
import BaskanSinavProgrami from './BaskanSinavProgrami';
import BaskanDerslikPlan from './BaskanDerslikPlan';
import BaskanSinavDetay from './BaskanSinavDetay';
import ShowExamSeatPlan from '../../components/ShowExamSeatPlan';
import DersProgramiList from '../sekreter/DersProgramiList';

const BolumBaskaniPaneli = () => {
    const [aktifModul, setAktifModul] = useState('yetkilendirme');
    const [yetkiliMi, setYetkiliMi] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const rolId = Number(localStorage.getItem('rolId'));
        if (rolId === 1) {
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

    const renderIcerik = () => {
        switch (aktifModul) {
            case 'yetkilendirme':
                return <KullaniciYetkilendirme />;
            case 'ders-programi-islemleri':
                return <DersProgramiList />;
            case 'sinav-programi':
                return <BaskanSinavProgrami />;
            case 'derslik-plan':
                return <BaskanDerslikPlan />;
            default:
                return <div>Modül bulunamadı.</div>;
        }
    };

    if (!yetkiliMi) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Bu sayfaya erişmek için bölüm başkanı girişi yapmalısınız.</h2>
                <button onClick={handleLogoutAndRedirect} style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Girişe Git
                </button>
            </div>
        );
    }

    return (
        <div className="panel-container">
            <aside className="sidebar">
                <h2 className="panel-title">Bölüm Başkanı Paneli</h2>
                <img src={logo} alt="KOÜ Logo" />
                <h3>Modüller</h3>
                <ul>
                    <li onClick={() => setAktifModul('yetkilendirme')}>👥 Kullanıcı Yetkilendirme</li>
                    <li onClick={() => setAktifModul('ders-programi-islemleri')}>📚 Ders Programı</li>
                    <li onClick={() => setAktifModul('sinav-programi')}>📝 Sınav Programı</li>
                    <li onClick={() => setAktifModul('derslik-plan')}>🏫 Derslik Planı</li>
                </ul>
            </aside>
            <main className="content-area">{renderIcerik()}</main>
        </div>
    );
};

export default BolumBaskaniPaneli;
