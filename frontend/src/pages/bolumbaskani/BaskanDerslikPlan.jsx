import React, { useEffect, useState } from 'react';
import '../../css/bolumbaskani/baskanDerslikPlan.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const BaskanDerslikPlan = () => {
    const navigate = useNavigate();

    // ✅ Yetki kontrolü için state
    const [yetkiliMi, setYetkiliMi] = useState(false);

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

    const [derslikler, setDerslikler] = useState([]);
    const bolumId = 1; // Sabit

    const fetchDerslikler = async () => {
        try {
            const response = await fetch(`${API_URL}/rest/api/derslik/getir/${bolumId}`, {
                headers: { "ngrok-skip-browser-warning": "69420" },
            });
            if (!response.ok) throw new Error('Derslikler yüklenemedi');
            const data = await response.json();
            setDerslikler(data);
        } catch (error) {
            console.error('API Hatası:', error);
            alert('Derslikler yüklenirken bir hata oluştu.');
        }
    };

    useEffect(() => {
        if (!yetkiliMi) return;
        fetchDerslikler();
    }, [yetkiliMi]);

    const handleDetay = (derslikId) => {
        navigate(`/baskan-derslik-detay/${derslikId}`);
    };

    // ✅ Yetkisizse uyarı ve buton
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
        <div className="baskan-derslik-container">
            <h2>Derslik Kullanım ve Kapasite Planı</h2>
            <table className="derslik-table">
                <thead>
                    <tr>
                        <th>Derslik Adı</th>
                        <th>Kapasite</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {derslikler.map((d) => (
                        <tr key={d.id}>
                            <td>{d.derslikAdi}</td>
                            <td>{d.kapasite}</td>
                            <td>
                                <button onClick={() => handleDetay(d.id)}>Detay</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BaskanDerslikPlan;
