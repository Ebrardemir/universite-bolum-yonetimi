// ✅ src/pages/LessonTable.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import Lessons from '../components/Lessons';
import Teachers from '../components/Teachers';
import Classrooms from '../components/Class';
import { postSchedule, createFullScheduleData } from '../redux/slices/scheduleSlice';

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const hours = Array.from({ length: 13 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

function LessonTable() {
    const dispatch = useDispatch();
    const { dersProgramiId } = useParams();

    const [schedule, setSchedule] = useState({});
    const [lessonHours, setLessonHours] = useState({});

    const { loadingPost, loadingCreate, programContents } = useSelector((state) => state.schedule);
    const dersler = useSelector((state) => state.schedule.data.dersler || [], shallowEqual);

    // ✅ Param değişince: store'u doldur, local schedule'ı hemen temizle
    useEffect(() => {
        if (dersProgramiId) {
            dispatch(createFullScheduleData({ dersProgramiId }));
            setSchedule({});
        }
    }, [dersProgramiId, dispatch]);

    // ✅ Dersler değişince saat sayısını ayarla
    useEffect(() => {
        const initial = {};
        dersler.forEach(d => { initial[d.id] = d.saatSayisi || 0; });
        setLessonHours(initial);
    }, [dersler]);

    // ✅ programContents değişince tabloyu hep baştan kur — BOŞSA DA SIFIRLA
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
                    readonly: true,
                    text: {
                        dersAdi: entry.dersAdi,
                        alanKisiSayisi: entry.alanKisiSayisi ?? 0,
                        id: entry.dersId,
                        icerikId: entry.id // ✅ backend içerik id
                    }
                });
            }
            if (entry.isim && entry.soyisim) {
                converted[gun][saat].push({
                    type: 'teacher',
                    readonly: true,
                    text: {
                        unvan: entry.unvan || '',
                        isim: entry.isim,
                        soyisim: entry.soyisim,
                        id: entry.gorevliId,
                        icerikId: entry.id
                    }
                });
            }
            if (entry.derslikAdi) {
                converted[gun][saat].push({
                    type: 'classroom',
                    readonly: true,
                    text: {
                        derslikAdi: entry.derslikAdi,
                        kapasite: entry.kapasite,
                        id: entry.derslikId,
                        icerikId: entry.id
                    }
                });
            }
        });

        setSchedule(converted);
    }, [programContents]);

    const handleDrop = (e, day, hour) => {
        e.preventDefault();
        const rawData = e.dataTransfer.getData('text/plain');
        if (!rawData) return;
        let parsed;
        try { parsed = JSON.parse(rawData); } catch { return; }

        const { text, type } = parsed;

        if (type === 'lesson') {
            const dersId = text.id;
            if (!lessonHours[dersId] || lessonHours[dersId] <= 0) {
                alert('Bu dersin tüm saatleri tabloya yerleştirildi.');
                return;
            }
            setLessonHours(prev => ({ ...prev, [dersId]: prev[dersId] - 1 }));
        }

        const newSchedule = { ...schedule };
        if (!newSchedule[day]) newSchedule[day] = {};
        if (!newSchedule[day][hour]) newSchedule[day][hour] = [];
        if (newSchedule[day][hour].some(item => item.type === type)) return;
        newSchedule[day][hour].push({ text, type });
        setSchedule(newSchedule);
    };

    const handleSubmit = () => {
        dispatch(postSchedule(schedule))
            .unwrap()
            .then(() => {
                alert('Program başarıyla gönderildi!');
                dispatch(createFullScheduleData({ dersProgramiId })); // ✅ Güncel veri için tekrar çek
            })
            .catch(err => alert('Hata oluştu: ' + err));
    };

    const handleRemove = (day, hour, index) => {
        const newSchedule = { ...schedule };
        if (newSchedule[day]?.[hour]) {
            newSchedule[day][hour].splice(index, 1);
            if (newSchedule[day][hour].length === 0) {
                delete newSchedule[day][hour];
                if (Object.keys(newSchedule[day]).length === 0) {
                    delete newSchedule[day];
                }
            }
        }
        setSchedule(newSchedule);
    };

    const renderBadge = (item, index, day, hour) => {
        let bg = '#fce4ec';
        let text = '';

        if (item.type === 'teacher') {
            bg = '#e0f7fa';
            text = `${item.text.unvan} ${item.text.isim} ${item.text.soyisim}`;
        } else if (item.type === 'classroom') {
            bg = '#ede7f6';
            text = `${item.text.derslikAdi} (${item.text.kapasite} kişilik)`;
        } else if (item.type === 'lesson') {
            bg = '#fce4ec';
            text = `${item.text.dersAdi} (${item.text.alanKisiSayisi} kişi)`;
        }

        return (
            <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: bg,
                color: '#333',
                padding: '4px 8px',
                borderRadius: '12px',
                margin: '4px 0',
                fontSize: '13px',
                width: 'fit-content'
            }}>
                {text}
                <button onClick={() => handleRemove(day, hour, index)}
                    style={{
                        marginLeft: '6px',
                        background: 'transparent',
                        border: 'none',
                        color: 'red',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}>×</button>
            </div>
        );
    };

    return (
        <div>
            <div style={{
                width: '97%',
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '20px',
                paddingBottom: '0'
            }}>
                <button onClick={handleSubmit} disabled={loadingPost}
                    style={{
                        padding: '10px 20px',
                        fontSize: '14px',
                        backgroundColor: loadingPost ? '#90caf9' : '#2196f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: loadingPost ? 'not-allowed' : 'pointer'
                    }}>
                    {loadingPost ? 'Kaydediliyor...' : 'Programı Kaydet'}
                </button>
            </div>

            <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    width: '250px',
                    position: 'sticky',
                    top: '20px',
                    alignSelf: 'flex-start'
                }}>
                    <Lessons lessonHours={lessonHours} />
                    <Teachers />
                    <Classrooms />
                </div>

                <div style={{ overflowX: 'auto', flexGrow: 1 }}>
                    {loadingCreate ? (
                        <p style={{ textAlign: 'center', marginTop: '50px' }}>Tablo yükleniyor...</p>
                    ) : (
                        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '700px', textAlign: 'center' }}>
                            <thead>
                                <tr>
                                    <th style={{ ...cellStyle, backgroundColor: '#f9f9f9' }}>Saat</th>
                                    {days.map(day => (
                                        <th key={day} style={{ ...cellStyle, backgroundColor: '#f9f9f9' }}>{day}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {hours.map((hour, rowIdx) => (
                                    <tr key={rowIdx}>
                                        <td style={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>{hour}</td>
                                        {days.map(day => (
                                            <td key={day} onDrop={e => handleDrop(e, day, hour)}
                                                onDragOver={e => e.preventDefault()}
                                                style={{ ...cellStyle, backgroundColor: '#fff' }}>
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                    {schedule[day]?.[hour]?.map((entry, index) =>
                                                        renderBadge(entry, index, day, hour)
                                                    )}
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

const cellStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    minWidth: '100px',
    height: '60px',
    verticalAlign: 'top',
};

export default LessonTable;
