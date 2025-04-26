import React from 'react';
import "../css/kapiIsimligiPrint.css"

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const hours = Array.from({ length: 9 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

// Sadece örnek static veri
const staticSchedule = {
    Pazartesi: {
        '08:00 - 09:00': [
            {
                type: 'lesson',
                text: { dersAdi: 'Veri Yapıları', alanKisiSayisi: 2 },
            },
            {
                type: 'teacher',
                text: { unvan: 'Dr.', isim: 'Ahmet', soyisim: 'Yılmaz' },
            },
            {
                type: 'classroom',
                text: { derslikAdi: 'B201', kapasite: 50 },
            },
        ],
    },
    Salı: {
        '10:00 - 11:00': [
            {
                type: 'lesson',
                text: { dersAdi: 'Algoritmalar', alanKisiSayisi: 1 },
            },
            {
                type: 'teacher',
                text: { unvan: 'Prof.', isim: 'Mehmet', soyisim: 'Kara' },
            },
            {
                type: 'classroom',
                text: { derslikAdi: 'A101', kapasite: 50 },
            },
        ],
        '13:00 - 14:00': [
            {
                type: 'lesson',
                text: { dersAdi: 'Web Programlama', alanKisiSayisi: 1 },
            },
            {
                type: 'teacher',
                text: { unvan: 'Doç.', isim: 'Elif', soyisim: 'Demir' },
            },
            {
                type: 'classroom',
                text: { derslikAdi: 'C303', kapasite: 50 },
            },
        ],
    },
    Perşembe: {
        '09:00 - 10:00': [
            {
                type: 'lesson',
                text: { dersAdi: 'Yapay Zeka', alanKisiSayisi: 1 },
            },
            {
                type: 'teacher',
                text: { unvan: 'Arş. Gör.', isim: 'Zeynep', soyisim: 'Şahin' },
            },
            {
                type: 'classroom',
                text: { derslikAdi: 'D404', kapasite: 50 },
            },
        ],
    },
};

const TeacherSchedule = () => {
    const renderBadge = (item, index) => {
        let backgroundColor = '#fce4ec';
        let textToShow = '';

        if (item.type === 'teacher') {
            backgroundColor = '#e0f7fa';
            textToShow = `${item.text.unvan} ${item.text.isim} ${item.text.soyisim}`;
        } else if (item.type === 'classroom') {
            backgroundColor = '#ede7f6';
            textToShow = `${item.text.derslikAdi} (${item.text.kapasite} kişilik)`;
        } else if (item.type === 'lesson') {
            backgroundColor = '#fce4ec';
            textToShow = `${item.text.dersAdi} (${item.text.alanKisiSayisi} kişi)`;
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
                        {days.map((day) => (
                            <th key={day} style={cellStyle}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {hours.map((hour, rowIdx) => (
                        <tr key={rowIdx}>
                            <td style={{ ...cellStyle, fontWeight: 'bold' }}>{hour}</td>
                            {days.map((day) => (
                                <td key={day + hour} style={cellStyle}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        {staticSchedule[day]?.[hour]?.map((entry, index) =>
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

export default TeacherSchedule;
