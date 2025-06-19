import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const hours = Array.from({ length: 13 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

export default function DersProgramiGoruntule() {
    const { id } = useParams();
    const navigate = useNavigate();

    // ✅ Yetki kontrolü
    const [yetkiliMi, setYetkiliMi] = useState(false);

    useEffect(() => {
        const rolId = Number(localStorage.getItem('rolId'));
        if (rolId === 1 || rolId === 2) {
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

    const [programContents, setProgramContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        if (!yetkiliMi) return;

        const fetchProgram = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/rest/api/ders-programi-icerik/${id}/getir-list`, {
                    headers: { 'ngrok-skip-browser-warning': '69420' },
                });
                if (!response.ok) throw new Error('Veri çekilemedi');
                const data = await response.json();
                setProgramContents(data);
            } catch (err) {
                console.error('Hata:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProgram();
    }, [id, yetkiliMi]);

    useEffect(() => {
        if (!programContents || programContents.length === 0) {
            setSchedule({});
            return;
        }

        const converted = {};
        programContents.forEach((entry) => {
            const saat = `${entry.baslangicSaati.slice(0, 5)} - ${entry.bitisSaati.slice(0, 5)}`;
            const gun = entry.gun;
            if (!converted[gun]) converted[gun] = {};
            if (!converted[gun][saat]) converted[gun][saat] = [];

            if (entry.dersAdi) {
                converted[gun][saat].push({
                    type: 'lesson',
                    text: `${entry.dersAdi}`
                });
            }
            if (entry.isim && entry.soyisim) {
                converted[gun][saat].push({
                    type: 'teacher',
                    text: `${entry.unvan} ${entry.isim} ${entry.soyisim}`
                });
            }
            if (entry.derslikAdi) {
                converted[gun][saat].push({
                    type: 'classroom',
                    text: `${entry.derslikAdi}`
                });
            }
        });

        setSchedule(converted);
    }, [programContents]);

    // ✅ Yetkisizse uyarı + buton
    if (!yetkiliMi) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Bu sayfaya erişmek için yetkili giriş yapmalısınız.</h2>
                <button onClick={handleLogoutAndRedirect} style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Girişe Git
                </button>
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '20px' }}>Ders Programı Görüntüle</h2>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{
                        borderCollapse: 'collapse',
                        width: '100%',
                        minWidth: '600px',
                        fontSize: '14px'
                    }}>
                        <thead>
                            <tr>
                                <th style={{ ...cellStyle, backgroundColor: '#f0f0f0', fontSize: '16px', textAlign: 'center', verticalAlign: 'middle' }}>Saat</th>
                                {days.map(day => (
                                    <th key={day} style={{ ...cellStyle, backgroundColor: '#f0f0f0', fontSize: '16px', textAlign: 'center', verticalAlign: 'middle' }}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map((hour, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td style={{
                                        ...cellStyle,
                                        fontWeight: 'bold',
                                        backgroundColor: '#fafafa',
                                        fontSize: '15px',
                                        textAlign: 'center',
                                        verticalAlign: 'middle'
                                    }}>
                                        {hour}
                                    </td>
                                    {days.map(day => (
                                        <td key={day} style={{ ...cellStyle, textAlign: 'center', verticalAlign: 'middle' }}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                {schedule[day]?.[hour]?.map((entry, index) => (
                                                    <div key={index} style={{
                                                        margin: '2px 0',
                                                        fontSize: '13px',
                                                    }}>
                                                        {entry.text}
                                                    </div>
                                                ))}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const cellStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    minWidth: '80px',
    height: '50px',
    textAlign: 'center',
    verticalAlign: 'middle',
};
