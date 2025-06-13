import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const API_URL = import.meta.env.VITE_API_URL;

const gunler = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const saatler = Array.from({ length: 14 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;
    return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

const OgretimElemanlari = () => {
    const [ogretimElemanlari, setOgretimElemanlari] = useState([]);
    const [selectedGorevli, setSelectedGorevli] = useState(null);
    const [dersProgrami, setDersProgrami] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const tableRef = useRef();

    useEffect(() => {
        fetch(`${API_URL}/rest/api/gorevli/ogretim-elemanlari-list/1`, {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        })
            .then(res => res.ok ? res.json() : Promise.reject('Veri alınamadı'))
            .then(data => {
                setOgretimElemanlari(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const handleClick = (gorevli) => {
        setSelectedGorevli(gorevli);
        fetch(`${API_URL}/rest/api/ders-programi-icerik/kapi-isimligi/${gorevli.id}`, {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        })
            .then(res => res.ok ? res.json() : Promise.reject('Ders programı alınamadı'))
            .then(data => setDersProgrami(data))
            .catch(err => setError(err));
    };

    const getCellContent = (gun, saatAraligi) => {
        const baslangic = saatAraligi.split(' - ')[0] + ':00';
        const kayit = dersProgrami.find(p =>
            p.gun === gun &&
            p.baslangicSaati === baslangic
        );
        return kayit ? `${kayit.dersAdi} (${kayit.derslikAdi})` : '';
    };

    const exportToPDF = () => {
        const table = tableRef.current;

        html2canvas(table, {
            scale: 2,            // yeterli çözünürlük, çok büyük değil
            useCORS: true,
            backgroundColor: '#ffffff'  // arka plan tam beyaz olsun
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 0.92); // iyi kalite, düşük boyut
            const pdf = new jsPDF('landscape', 'mm', 'a4');

            const pdfWidth = pdf.internal.pageSize.getWidth();   // 297mm
            const pdfHeight = pdf.internal.pageSize.getHeight(); // 210mm

            const imgWidth = pdfWidth;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const yOffset = (pdfHeight - imgHeight) / 2; // dikey ortalama

            pdf.addImage(imgData, 'JPEG', 0, yOffset > 0 ? yOffset : 0, imgWidth, imgHeight);
            pdf.save(`${selectedGorevli.unvan}_${selectedGorevli.isim}_${selectedGorevli.soyisim}_Program.pdf`);
        });
    };


    return (
        <div style={{ padding: '20px', backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', fontSize: '28px', marginBottom: '20px' }}>Öğretim Elemanları</h2>

            {loading && <p>Yükleniyor...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '30px', justifyContent: 'center' }}>
                {ogretimElemanlari.map((gorevli) => (
                    <div
                        key={gorevli.id}
                        onClick={() => handleClick(gorevli)}
                        style={{
                            padding: '14px 20px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            backgroundColor: '#fff',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e6f7ff')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                    >
                        <strong>{gorevli.unvan} {gorevli.isim} {gorevli.soyisim}</strong>
                    </div>
                ))}
            </div>

            {selectedGorevli && (
                <>
                    <div
                        ref={tableRef}
                        style={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '12px',
                            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                            marginTop: '20px',
                        }}
                    >
                        <h3 style={{
                            textAlign: 'center',
                            fontSize: '22px',
                            marginBottom: '20px',
                            fontWeight: '600'
                        }}>
                            {selectedGorevli.unvan} {selectedGorevli.isim} {selectedGorevli.soyisim} - <strong>Ders Programı</strong>
                        </h3>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th style={thStyle}>Saat / Gün</th>
                                        {gunler.map((gun) => (
                                            <th key={gun} style={thStyle}>{gun}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {saatler.map((saat) => (
                                        <tr key={saat}>
                                            <td style={thStyle}>{saat}</td>
                                            {gunler.map((gun) => (
                                                <td key={gun + saat} style={tdStyle}>
                                                    {getCellContent(gun, saat)}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <button onClick={exportToPDF} style={buttonStyle}>
                            PDF Olarak Kaydet
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

const thStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    minWidth: '100px',
    fontWeight: 'bold'
};

const tdStyle = {
    border: '1px solid #ccc',
    padding: '10px',
    textAlign: 'center',
    verticalAlign: 'middle',
    minHeight: '50px'
};

const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#1890ff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
};

export default OgretimElemanlari;
