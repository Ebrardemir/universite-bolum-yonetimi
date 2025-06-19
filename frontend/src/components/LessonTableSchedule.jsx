import React, { useState, useEffect } from 'react';
import "../css/akademikpersonel/kapiIsimligiPrint.css";

const API_URL = import.meta.env.VITE_API_URL;

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const hours = Array.from({ length: 9 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

const LessonTableSchedule = () => {
    const [schedule, setSchedule] = useState({});
    const görevliId = Number(localStorage.getItem('userId'));

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/rest/api/ders-programi-icerik/kapi-isimligi/${görevliId}`,
                    {
                        headers: {
                            'ngrok-skip-browser-warning': '69420',
                        },
                    }
                );
                const data = await response.json();

                const formatted = {};
                data.forEach(item => {
                    const gun = item.gun;
                    const hour = `${item.baslangicSaati.substring(0, 5)} - ${item.bitisSaati.substring(0, 5)}`;

                    if (!formatted[gun]) {
                        formatted[gun] = {};
                    }
                    if (!formatted[gun][hour]) {
                        formatted[gun][hour] = [];
                    }

                    formatted[gun][hour].push(
                        { type: 'lesson', text: { dersAdi: item.dersAdi } },
                        { type: 'teacher', text: { unvan: item.unvan, isim: item.isim, soyisim: item.soyisim } },
                        { type: 'classroom', text: { derslikAdi: item.derslikAdi } }
                    );
                });

                setSchedule(formatted);
            } catch (error) {
                console.error('API çağrısı hatası:', error);
            }
        };

        fetchSchedule();
    }, [görevliId]);

    const renderBadge = (item, index) => {
        let backgroundColor = '#fce4ec';
        let textToShow = '';

        if (item.type === 'teacher') {
            backgroundColor = '#e0f7fa';
            textToShow = `${item.text.unvan} ${item.text.isim} ${item.text.soyisim}`;
        } else if (item.type === 'classroom') {
            backgroundColor = '#ede7f6';
            textToShow = `${item.text.derslikAdi}`;
        } else if (item.type === 'lesson') {
            backgroundColor = '#fce4ec';
            textToShow = `${item.text.dersAdi}`;
        }

        return (
            <div
                key={index}
                style={{
                    backgroundColor,
                    padding: '4px 8px',
                    borderRadius: '12px',
                    margin: '4px 0',
                    fontSize: '13px',
                    width: 'fit-content',
                }}
            >
                {textToShow}
            </div>
        );
    };

    const handlePrint = () => {
        window.print();
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

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
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
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {schedule[day]?.[hour]?.map((entry, index) =>
                                            renderBadge(entry, index)
                                        )}
                                    </div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    minWidth: '100px',
    height: '80px',
    verticalAlign: 'top',
};

export default LessonTableSchedule;
