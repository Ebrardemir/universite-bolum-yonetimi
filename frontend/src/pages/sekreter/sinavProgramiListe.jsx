import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale("tr", tr);


const API_URL = import.meta.env.VITE_API_URL;

const SinavProgramiListe = () => {
    const [sinavlar, setSinavlar] = useState([]);
    const [yeniIsim, setYeniIsim] = useState('');
    const [baslangicTarihi, setBaslangicTarihi] = useState(null);
    const [bitisTarihi, setBitisTarihi] = useState(null);
    const [donem, setDonem] = useState('');
    const [gosterInput, setGosterInput] = useState(false);
    const navigate = useNavigate();

    const sinavlariGetir = async () => {
        try {
            const response = await axios.get(`${API_URL}/rest/api/sinav-table/1/getir/list`, {
                headers: {
                    'ngrok-skip-browser-warning': '69420'
                }
            });
            setSinavlar(response.data);
        } catch (error) {
            console.error('Sınavları çekerken hata:', error);
        }
    };

    useEffect(() => {
        sinavlariGetir();
    }, []);

    const sinavEkle = async () => {
        try {
            if (!yeniIsim || !baslangicTarihi || !bitisTarihi || !donem) {
                alert("Tüm alanları doldurmalısınız.");
                return;
            }

            const yeniSinav = {
                bolumId: 1,
                onay: 0,
                isim: yeniIsim,
                baslangicTarihi: baslangicTarihi.toLocaleDateString('sv-SE'), // yyyy-mm-dd formatında
                bitisTarihi: bitisTarihi.toLocaleDateString('sv-SE'),

                donem: Number(donem)
            };

            await axios.post(`${API_URL}/rest/api/sinav-table/save`, yeniSinav);
            setYeniIsim('');
            setBaslangicTarihi(null);
            setBitisTarihi(null);
            setDonem('');
            setGosterInput(false);
            sinavlariGetir();
        } catch (error) {
            console.error('Sınav eklenemedi:', error);
        }
    };

    const sinavaGit = (id) => {
        navigate(`/sinav-programi/${id}`);
    };

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Sınav Listesi</h2>
                <button onClick={() => setGosterInput(true)}>+ Ekle</button>
            </div>

            {gosterInput && (
                <div style={{ marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                    <input
                        type="text"
                        placeholder="Sınav ismi giriniz"
                        value={yeniIsim}
                        onChange={(e) => setYeniIsim(e.target.value)}
                    />

                    <label>Başlangıç Tarihi:</label>
                    <DatePicker
                        locale="tr"
                        selected={baslangicTarihi}
                        onChange={(date) => setBaslangicTarihi(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Başlangıç tarihi seçin"
                    />

                    <label>Bitiş Tarihi:</label>
                    <DatePicker
                        locale="tr"
                        selected={bitisTarihi}
                        onChange={(date) => setBitisTarihi(date)}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Bitiş tarihi seçin"
                    />

                    <label>Dönem:</label>
                    <select value={donem} onChange={(e) => setDonem(e.target.value)}>
                        <option value="">Seçiniz</option>
                        <option value="1">1. Dönem</option>
                        <option value="2">2. Dönem</option>
                    </select>

                    <button onClick={sinavEkle}>Kaydet</button>
                </div>
            )}

            {Array.isArray(sinavlar) && sinavlar.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {sinavlar.map((sinav) => (
                        <div
                            key={sinav.sinavId}
                            onClick={() => sinavaGit(sinav.sinavId)}
                            style={{
                                border: '1px solid #ccc',
                                padding: '10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                backgroundColor: '#f9f9f9',
                                transition: '0.2s',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.1)'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e6f2ff'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
                        >
                            <strong>{sinav.isim}</strong> — {sinav.onay === 1 ? '✅ Onaylı' : '⏳ Bekliyor'}
                            <div style={{ marginTop: '5px', fontSize: '14px', color: '#333' }}>
                                📅 <strong>Başlangıç:</strong> {sinav.baslangicTarihi} <br />
                                📅 <strong>Bitiş:</strong> {sinav.bitisTarihi} <br />
                                🕑 <strong>Dönem:</strong> {sinav.donem}. Dönem
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ fontStyle: 'italic', color: 'gray' }}>Şu anlık sınav listesi yok.</p>
            )}

        </div>
    );
};

export default SinavProgramiListe;
