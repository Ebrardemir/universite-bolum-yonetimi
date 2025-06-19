import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/akademikpersonel/panel.css';
import logo from '../../images/kou.png';
import CourseSchedule from './CourseSchedule';
import ExamSchedule from './ExamSchedule';

const AkademikPersonelPaneli = () => {
    const [aktifModul, setAktifModul] = useState();
    const [yetkiliMi, setYetkiliMi] = useState(false);
    const navigate = useNavigate();

    // ✅ Yetki kontrolü
    useEffect(() => {
        const rolId = Number(localStorage.getItem('rolId'));
        if (rolId === 3) {
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
            case 'ders-programi':
                return <CourseSchedule />;
            case 'sinav-programi':
                return <ExamSchedule />;
            default:
                return null;
        }
    };

    // ✅ Yetkisizse uyarı + buton
    if (!yetkiliMi) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Bu sayfaya erişmek için öğretim elemanı girişi yapmalısınız.</h2>
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
                <h2 className="panel-title">Akademik Personel Paneli</h2>
                <img src={logo} alt="KOÜ Logo" />
                <h3>Modüller</h3>
                <ul>
                    <li onClick={() => setAktifModul('ders-programi')}>📚 Ders Programım</li>
                    <li onClick={() => setAktifModul('sinav-programi')}>📝 Sınav Programım</li>
                    <li onClick={handleLogout} style={{ color: 'red', marginTop: '20px', cursor: 'pointer' }}>
                        🚪 Çıkış Yap
                    </li>
                </ul>
            </aside>
            <main className="content-area">
                {renderIcerik()}
            </main>
        </div>
    );
};

export default AkademikPersonelPaneli;
