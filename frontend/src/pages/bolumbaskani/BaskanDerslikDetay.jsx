import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const hours = Array.from({ length: 13 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00:00 - ${end.toString().padStart(2, '0')}:00:00`;
});

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];

export default function BaskanDerslikDetay() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [derslikAdi, setDerslikAdi] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/rest/api/ders-programi-icerik/derslik-programi/${id}`, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
                if (!response.ok) throw new Error('Veri yüklenemedi!');
                const json = await response.json();
                setData(json);
                if (json.length > 0) {
                    setDerslikAdi(json[0].derslikAdi);
                }
            } catch (err) {
                console.error(err);
                alert("Bir hata oluştu!");
            }
        };
        fetchDetails();
    }, [id]);

    const schedule = {};
    data.forEach(item => {
        const day = item.gun;
        const hour = `${item.baslangicSaati} - ${item.bitisSaati}`;
        if (!schedule[day]) schedule[day] = {};
        if (!schedule[day][hour]) schedule[day][hour] = [];
        schedule[day][hour].push(item);
    });

    const cellStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        minWidth: '150px',
        verticalAlign: 'top',
        textAlign: 'center' // 📌 ORTALA
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Derslik Programı — {derslikAdi}</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ ...cellStyle, backgroundColor: '#eee' }}>Saat</th>
                        {days.map(day => (
                            <th key={day} style={{ ...cellStyle, backgroundColor: '#eee' }}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map(hour => (
                        <tr key={hour}>
                            <td style={{ ...cellStyle, backgroundColor: '#f9f9f9', fontWeight: 'bold' }}>
                                {hour.split(' - ')[0]} - {hour.split(' - ')[1]}
                            </td>
                            {days.map(day => (
                                <td key={day + hour} style={cellStyle}>
                                    {(schedule[day]?.[hour] || []).map((item, i) => (
                                        <div key={i} style={{ fontSize: '13px', marginBottom: '4px' }}>
                                            <strong>{item.dersAdi}</strong><br />
                                            {item.unvan} {item.isim} {item.soyisim}
                                        </div>
                                    ))}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
