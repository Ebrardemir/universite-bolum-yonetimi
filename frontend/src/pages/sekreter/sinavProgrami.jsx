import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const hours = Array.from({ length: 13 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

function SinavProgrami() {
    const { sinavId } = useParams();
    const [schedule, setSchedule] = useState({});
    const [sinavlar, setSinavlar] = useState([]);
    const [gozetmenler, setGozetmenler] = useState([]);
    const [derslikler, setDerslikler] = useState([]);
    const [weekChunks, setWeekChunks] = useState([]);

    const generateWeekChunks = (startDate, endDate) => {
        const result = [];
        let current = new Date(startDate);

        while (current <= endDate) {
            const week = [];
            for (let i = 0; i < 7 && current <= endDate; i++) {
                week.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
            result.push(week);
        }
        return result;
    };

    const mapOncekiVeriToSchedule = (oncekiVeri, sinavlarData, gozetmenlerData, dersliklerData) => {
        const newSchedule = {};

        oncekiVeri.forEach(item => {
            const dayKey = item.sinavTarih;
            const hourKey = `${item.baslangicSaati.slice(0, 5)} - ${item.bitisSaati.slice(0, 5)}`;

            newSchedule[dayKey] = newSchedule[dayKey] || {};
            newSchedule[dayKey][hourKey] = newSchedule[dayKey][hourKey] || [];

            const dersObj = sinavlarData.find(d => d.id === item.dersId);
            if (dersObj) newSchedule[dayKey][hourKey].push({ type: 'lesson', text: dersObj });

            const gozetmenObj = gozetmenlerData.find(g => g.id === item.gozetmenId);
            if (gozetmenObj) newSchedule[dayKey][hourKey].push({ type: 'gozetmen', text: gozetmenObj });

            if (Array.isArray(item.derslikler)) {
                item.derslikler.forEach(derslik => {
                    const derslikObj = dersliklerData.find(r => r.id === derslik.id || r.derslikId === derslik.id);
                    if (derslikObj) newSchedule[dayKey][hourKey].push({ type: 'classroom', text: derslikObj });
                });
            }
        });

        return newSchedule;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const sinavRes = await axios.get(`${API_URL}/rest/api/sinav-table/${sinavId}/getir`, {
                    headers: { 'ngrok-skip-browser-warning': '69420' }
                });
                const sinavData = sinavRes.data;
                const { bolumId, donem, baslangicTarihi, bitisTarihi } = sinavData;

                const start = new Date(baslangicTarihi);
                const end = new Date(bitisTarihi);
                const weeks = generateWeekChunks(start, end);
                setWeekChunks(weeks);

                const [dersRes, gozetmenRes, derslikRes] = await Promise.all([
                    axios.post(`${API_URL}/rest/api/ders/ders-list-bolmvedonem`, { bolumId, donem }, {
                        headers: { 'ngrok-skip-browser-warning': '69420' }
                    }),
                    axios.get(`${API_URL}/rest/api/gorevli/ogretim-elemanlari-list/1`, {
                        headers: { 'ngrok-skip-browser-warning': '69420' }
                    }),
                    axios.get(`${API_URL}/rest/api/derslik/getir/1`, {
                        headers: { 'ngrok-skip-browser-warning': '69420' }
                    })
                ]);

                const sinavlarData = dersRes.data || [];
                const gozetmenlerData = gozetmenRes.data || [];
                const dersliklerData = derslikRes.data || [];

                setSinavlar(sinavlarData);
                setGozetmenler(gozetmenlerData);
                setDerslikler(dersliklerData);

                const oncekiSinavlarRes = await axios.get(`${API_URL}/rest/api/sinav/${sinavId}/listele`, {
                    headers: { 'ngrok-skip-browser-warning': '69420' }
                });

                const oncekiVeri = oncekiSinavlarRes.data || [];
                const newSchedule = mapOncekiVeriToSchedule(
                    oncekiVeri,
                    sinavlarData,
                    gozetmenlerData,
                    dersliklerData
                );

                setSchedule(newSchedule);
            } catch (err) {
                console.error("Veriler alınırken hata:", err);
            }
        };

        fetchData();
    }, []);

    const handleDrop = (e, date, hour) => {
        e.preventDefault();
        const raw = e.dataTransfer.getData('text/plain');
        if (!raw) return;

        const { type, text } = JSON.parse(raw);
        const day = date.toISOString().split('T')[0];
        const updated = { ...schedule };
        updated[day] = updated[day] || {};
        updated[day][hour] = updated[day][hour] || [];

        const alreadyExists = updated[day][hour].some(item =>
            item.type === type && JSON.stringify(item.text) === JSON.stringify(text)
        );
        if (alreadyExists) return;

        if (type === 'lesson' && updated[day][hour].some(i => i.type === 'lesson')) {
            alert("Bu saate zaten bir sınav atanmış.");
            return;
        }

        updated[day][hour].push({ type, text });
        setSchedule(updated);
    };

    const handleRemove = (day, hour, index) => {
        const updated = { ...schedule };
        if (updated[day]?.[hour]) {
            updated[day][hour].splice(index, 1);
            if (updated[day][hour].length === 0) delete updated[day][hour];
            if (Object.keys(updated[day]).length === 0) delete updated[day];
        }
        setSchedule(updated);
    };

    const handleSaveProgram = async () => {
        try {
            const payload = [];

            Object.entries(schedule).forEach(([day, hoursObj]) => {
                Object.entries(hoursObj).forEach(([hour, items]) => {
                    const ders = items.find(i => i.type === 'lesson');
                    const gozetmen = items.find(i => i.type === 'gozetmen');
                    const derslikler = items.filter(i => i.type === 'classroom');

                    if (!ders || !gozetmen || derslikler.length === 0) return;

                    const [baslangicSaati] = hour.split(' - ');
                    const [, bitisSaati] = hour.split(' - ');

                    const derslikIdList = derslikler.map(d => d.text.derslikId || d.text.id).filter(Boolean);

                    payload.push({
                        dersId: ders.text.id,
                        sinavTarih: day,
                        baslangicSaati,
                        bitisSaati,
                        derslikIdList,
                        gozetmenId: gozetmen.text.id,
                        sinavId: Number(sinavId)
                    });
                });
            });

            if (payload.length === 0) {
                alert("Kaydedilecek sınav bulunamadı.");
                return;
            }

            await axios.put(`${API_URL}/rest/api/sinav/save`, payload, {
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });

            alert("Sınav programı başarıyla kaydedildi!");
        } catch (err) {
            console.error("Kayıt hatası:", err);
            const mesaj = err?.response?.data || "Sınav programı kaydedilemedi.";
            alert(mesaj);
        }
    };

    const handleDeleteProgram = async () => {
        if (!window.confirm("Tüm sınav programını silmek istediğinize emin misiniz?")) return;

        try {
            await axios.delete(`${API_URL}/rest/api/sinav/${sinavId}/sil`, {
                headers: { 'ngrok-skip-browser-warning': '69420' }
            });

            alert("Tüm sınav programı silindi.");
            setSchedule({}); // Ekranı da temizle
        } catch (err) {
            console.error("Silme hatası:", err);
            alert("Silme işlemi sırasında bir hata oluştu.");
        }
    };


    const renderBadge = (item, day, hour, index) => {
        const colors = {
            lesson: '#fce4ec',
            gozetmen: '#e0f7fa',
            classroom: '#ede7f6'
        };
        const text = item.type === 'lesson'
            ? `${item.text.dersAdi} (${item.text.alanKisiSayisi ?? 1} kişi)`
            : item.type === 'gozetmen'
                ? `${item.text.unvan} ${item.text.isim} ${item.text.soyisim}`
                : `${item.text.derslikAdi} (${item.text.sinavKapasite ?? item.text.kapasite ?? '-'})`;

        return (
            <div key={index} style={{ backgroundColor: colors[item.type], margin: '4px 0', padding: '6px 10px', borderRadius: '10px', fontSize: '13px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {text}
                <button onClick={() => handleRemove(day, hour, index)} style={{ background: 'none', border: 'none', color: 'red', fontSize: '14px' }}>✕</button>
            </div>
        );
    };

    const draggableItem = (type, text, key) => {
        const label = type === 'lesson'
            ? `${text.dersAdi} (${text.alanKisiSayisi ?? 1} kişi)`
            : type === 'gozetmen'
                ? `${text.unvan} ${text.isim} ${text.soyisim}`
                : `${text.derslikAdi} (${text.sinavKapasite ?? text.kapasite ?? '-'})`;

        return (
            <div key={key} draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', JSON.stringify({ type, text }))} style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '8px', marginBottom: '8px', backgroundColor: '#f9f9f9', cursor: 'grab', fontSize: '14px' }}>
                {label}
            </div>
        );
    };

    const cellStyle = {
        border: '1px solid #ccc',
        padding: '10px',
        textAlign: 'center',
        verticalAlign: 'top',
        minWidth: '120px'
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                <button
                    onClick={handleDeleteProgram}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Tüm Programı Sil
                </button>
                <button
                    onClick={handleSaveProgram}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#4caf50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer'
                    }}
                >
                    Programı Kaydet
                </button>
            </div>


            <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
                <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <h3>Dersler</h3>
                        {sinavlar.map((d, i) => draggableItem('lesson', d, `l-${i}`))}
                    </div>
                    <div>
                        <h3>Gözetmenler</h3>
                        {gozetmenler.map((g, i) => draggableItem('gozetmen', g, `g-${i}`))}
                    </div>
                    <div>
                        <h3>Derslikler</h3>
                        {derslikler.map((r, i) => draggableItem('classroom', r, `r-${i}`))}
                    </div>
                </div>

                <div style={{ flexGrow: 1 }}>
                    {weekChunks.map((week, index) => (
                        <div key={index} style={{ marginBottom: '40px' }}>
                            <h4>Hafta {index + 1}</h4>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={cellStyle}>Saat</th>
                                        {week.map((date, idx) => (
                                            <th key={idx} style={cellStyle}>{date.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'short' })}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {hours.map(hour => (
                                        <tr key={hour}>
                                            <td style={{ ...cellStyle, backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>{hour}</td>
                                            {week.map((date, idx) => {
                                                const dayKey = date.toISOString().split('T')[0];
                                                return (
                                                    <td key={idx} onDrop={(e) => handleDrop(e, date, hour)} onDragOver={(e) => e.preventDefault()} style={cellStyle}>
                                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                            {schedule[dayKey]?.[hour]?.map((item, itemIndex) => renderBadge(item, dayKey, hour, itemIndex))}
                                                        </div>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SinavProgrami;
