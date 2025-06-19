import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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

    const [yetkiliMi, setYetkiliMi] = useState(false);
    const [programContents, setProgramContents] = useState([]);
    const [schedule, setSchedule] = useState({});
    const [loading, setLoading] = useState(true);
    const [notMap, setNotMap] = useState({}); // içerikId -> Not

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [activeNoteText, setActiveNoteText] = useState('');

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

    useEffect(() => {
        if (!yetkiliMi) return;

        const fetchProgram = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${API_URL}/rest/api/ders-programi-icerik/${id}/getir-list`, {
                    headers: { 'ngrok-skip-browser-warning': '69420' },
                });
                const data = res.data || [];
                setProgramContents(data);

                // Notları da getir
                const map = {};
                await Promise.all(data.map(async item => {
                    const notRes = await axios.get(`${API_URL}/rest/api/not/${item.id}/getir-ders-programi`, {
                        headers: { "ngrok-skip-browser-warning": "69420" }
                    });
                    const notes = notRes.data || [];
                    if (notes.length > 0) {
                        map[item.id] = notes[0]; // her içerik için 1 not
                    }
                }));
                setNotMap(map);

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

            converted[gun][saat].push({
                dersProgramiIcerikId: entry.id,
                dersAdi: entry.dersAdi,
                unvan: entry.unvan,
                isim: entry.isim,
                soyisim: entry.soyisim,
                derslikAdi: entry.derslikAdi
            });
        });

        setSchedule(converted);
    }, [programContents]);

    const openNoteModal = (icerikId) => {
        const note = notMap[icerikId];
        if (note) {
            setActiveNoteText(note.gorevliNot);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setActiveNoteText('');
    };

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
                                <th style={thStyle}>Saat</th>
                                {days.map(day => (
                                    <th key={day} style={thStyle}>{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {hours.map((hour, rowIdx) => (
                                <tr key={rowIdx}>
                                    <td style={thStyle}>{hour}</td>
                                    {days.map(day => (
                                        <td key={day} style={tdStyle}>
                                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                {schedule[day]?.[hour]?.map((entry, index) => (
                                                    <div key={index} style={{ margin: '2px 0', fontSize: '13px', textAlign: 'center' }}>
                                                        <div>{entry.dersAdi}</div>
                                                        <div>{`${entry.unvan} ${entry.isim} ${entry.soyisim}`}</div>
                                                        <div>{entry.derslikAdi}</div>
                                                        {notMap[entry.dersProgramiIcerikId] && (
                                                            <button
                                                                onClick={() => openNoteModal(entry.dersProgramiIcerikId)}
                                                                style={{ marginTop: '4px', fontSize: '12px', padding: '2px 6px' }}>
                                                                Notu Görüntüle
                                                            </button>
                                                        )}
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

            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Not Detayı</h3>
                        <p>{activeNoteText}</p>
                        <button onClick={closeModal} style={{ marginTop: "20px" }}>Kapat</button>
                    </div>
                </div>
            )}
        </div>
    );
}

const thStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontWeight: 'bold',
    minWidth: '100px'
};

const tdStyle = {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'center',
    verticalAlign: 'middle',
    minWidth: '100px'
};

const modalOverlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
};

const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%"
};
