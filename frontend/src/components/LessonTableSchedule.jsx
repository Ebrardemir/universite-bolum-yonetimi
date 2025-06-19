import React, { useState, useEffect, useRef } from 'react';
import "../css/akademikpersonel/kapiIsimligiPrint.css";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const hours = Array.from({ length: 9 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

const LessonTableSchedule = () => {
    const [schedule, setSchedule] = useState({});
    const [notMap, setNotMap] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [activeNotId, setActiveNotId] = useState(null);
    const [activeIcerikId, setActiveIcerikId] = useState(null);

    const görevliId = Number(localStorage.getItem('userId'));
    const tableRef = useRef(); // ✅ Yazdırılacak tablo için ref

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/rest/api/ders-programi-icerik/kapi-isimligi/${görevliId}`, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
                const data = res.data || [];

                const map = {};
                await Promise.all(data.map(async item => {
                    const notRes = await axios.get(`${API_URL}/rest/api/not/${item.id}/getir-ders-programi`, {
                        headers: { "ngrok-skip-browser-warning": "69420" }
                    });
                    const notes = notRes.data || [];
                    notes.forEach(n => {
                        map[n.dersProgramiIcerikId] = n;
                    });
                }));
                setNotMap(map);

                const formatted = {};
                data.forEach(item => {
                    const gun = item.gun;
                    const hour = `${item.baslangicSaati.substring(0, 5)} - ${item.bitisSaati.substring(0, 5)}`;
                    if (!formatted[gun]) formatted[gun] = {};
                    if (!formatted[gun][hour]) formatted[gun][hour] = [];
                    formatted[gun][hour].push({
                        dersProgramiIcerikId: item.id,
                        dersAdi: item.dersAdi,
                        unvan: item.unvan,
                        isim: item.isim,
                        soyisim: item.soyisim,
                        derslikAdi: item.derslikAdi
                    });
                });

                setSchedule(formatted);

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [görevliId]);

    const openNoteModal = (icerikId) => {
        const existing = notMap[icerikId];
        setActiveIcerikId(icerikId);
        setActiveNotId(existing?.id || null);
        setNoteText(existing?.gorevliNot || '');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNoteText('');
        setActiveNotId(null);
        setActiveIcerikId(null);
    };

    const saveNote = async () => {
        try {
            if (activeNotId) {
                await axios.put(`${API_URL}/rest/api/not/${activeNotId}/guncelle`, {
                    gorevliNot: noteText
                }, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
                alert("Not güncellendi.");
            } else {
                await axios.post(`${API_URL}/rest/api/not/save/ders-programi`, {
                    sinavId: null,
                    gorevliId: görevliId,
                    gorevliNot: noteText,
                    dersProgramiIcerikId: activeIcerikId
                }, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
                alert("Not eklendi.");
            }
            closeModal();
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Bir hata oluştu.");
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=900,height=600');
        printWindow.document.write('<html><head><title>Kapı İsimliği</title>');
        printWindow.document.write(`
            <style>
                table { width: 100%; border-collapse: collapse; }
                th, td { border: 1px solid #ccc; padding: 10px; }
                button { display: none !important; }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(tableRef.current.outerHTML);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <div style={{ padding: '20px' }}>
            <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Ders Programı</h1>
                <button
                    onClick={handlePrint}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                    }}
                >
                    Kapı İsimliği Yazdır
                </button>
            </div>

            <table ref={tableRef} style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Saat</th>
                        {days.map(day => (
                            <th key={day} style={cellStyle}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour, rowIdx) => (
                        <tr key={rowIdx}>
                            <td style={{ ...cellStyle, fontWeight: 'bold' }}>{hour}</td>
                            {days.map(day => (
                                <td key={day + hour} style={cellStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: "#000" }}>
                                        {schedule[day]?.[hour]?.map((entry, index) => (
                                            <div key={index} style={{ marginBottom: "10px", textAlign: "center" }}>
                                                <div>{entry.dersAdi}</div>
                                                <div>{`${entry.unvan} ${entry.isim} ${entry.soyisim}`}</div>
                                                <div>{entry.derslikAdi}</div>
                                                <button
                                                    onClick={() => openNoteModal(entry.dersProgramiIcerikId)}
                                                    style={{ marginTop: "4px", fontSize: "12px", padding: "4px 8px" }}
                                                    className="no-print"
                                                >
                                                    {notMap[entry.dersProgramiIcerikId] ? "Not Güncelle" : "Not Ekle"}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Not {activeNotId ? "Güncelle" : "Ekle"}</h3>
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Notunuzu buraya yazın..."
                            rows={5}
                            style={{ width: "90%", padding: "10px", fontSize: "16px" }}
                        ></textarea>
                        <div style={{ marginTop: "15px", textAlign: "right" }}>
                            <button onClick={closeModal} style={{ marginRight: "10px" }}>İptal</button>
                            <button onClick={saveNote} style={{ backgroundColor: "#10b981", color: "#fff", padding: "8px 16px", border: "none", borderRadius: "6px" }}>
                                {activeNotId ? "Güncelle" : "Kaydet"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    minWidth: '100px',
    height: '80px',
    verticalAlign: 'top',
    color: "#000",
};

const modalOverlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
};

const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
};

export default LessonTableSchedule;
