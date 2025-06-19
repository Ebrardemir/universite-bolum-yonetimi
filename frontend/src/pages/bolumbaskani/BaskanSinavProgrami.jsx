import React, { useEffect, useState } from "react";
import "../../css/bolumbaskani/baskanSinavProgrami.css";
import { useNavigate } from "react-router-dom";
import DatePicker, { registerLocale } from 'react-datepicker';
import tr from 'date-fns/locale/tr';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale("tr", tr);

const API_URL = import.meta.env.VITE_API_URL;

const BaskanSinavProgrami = () => {
    const navigate = useNavigate();

    // ✅ Yetki kontrolü için state
    const [yetkiliMi, setYetkiliMi] = useState(false);

    useEffect(() => {
        const rolId = Number(localStorage.getItem('rolId'));
        if (rolId === 1) {
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

    // ✅ Senin mevcut state'lerin
    const [sinavlar, setSinavlar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hata, setHata] = useState(null);

    const [gosterInput, setGosterInput] = useState(false);
    const [yeniIsim, setYeniIsim] = useState('');
    const [baslangicTarihi, setBaslangicTarihi] = useState(null);
    const [bitisTarihi, setBitisTarihi] = useState(null);
    const [donem, setDonem] = useState('');

    useEffect(() => {
        if (!yetkiliMi) return;
        fetchSinavlar();
    }, [yetkiliMi]);

    const fetchSinavlar = () => {
        fetch(`${API_URL}/rest/api/sinav-table/1/getir/list`, {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        })
            .then(async (res) => {
                const text = await res.text();
                console.log(" Gelen içerik:", text);
                try {
                    const json = JSON.parse(text);
                    setSinavlar(json);
                } catch (e) {
                    throw new Error("JSON parse hatası: " + e.message + " | Gelen veri: " + text.substring(0, 100));
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Veri çekme hatası:", err.message);
                setHata("Veri çekilemedi: " + err.message);
                setLoading(false);
            });
    };

    const handleOnayla = (id) => {
        fetch(`${API_URL}/rest/api/sinav-table/${id}/onayla`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Onay işlemi başarısız oldu.");
                }
                alert(`Sınav ID ${id} başarıyla onaylandı`);
                setSinavlar((prev) =>
                    prev.map((s) =>
                        s.sinavId === id ? { ...s, onay: 1 } : s
                    )
                );
            })
            .catch((err) => {
                console.error("Onayla hatası:", err.message);
                alert(`Hata: ${err.message}`);
            });
    };

    const handleDuzenle = (id) => {
        navigate(`/sinav-programi/${id}`);
    };

    const handleDetay = (id) => {
        navigate(`/sinav-detay/${id}`);
    };

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
                baslangicTarihi: baslangicTarihi.toLocaleDateString('sv-SE'),
                bitisTarihi: bitisTarihi.toLocaleDateString('sv-SE'),
                donem: Number(donem)
            };

            await fetch(`${API_URL}/rest/api/sinav-table/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': '69420'
                },
                body: JSON.stringify(yeniSinav)
            });

            setYeniIsim('');
            setBaslangicTarihi(null);
            setBitisTarihi(null);
            setDonem('');
            setGosterInput(false);
            fetchSinavlar();
        } catch (error) {
            console.error('Sınav eklenemedi:', error);
        }
    };

    // ✅ Yetkisizse uyarı ve buton
    if (!yetkiliMi) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Bu sayfaya erişmek için bölüm başkanı girişi yapmalısınız.</h2>
                <button onClick={handleLogoutAndRedirect} style={{ padding: '10px 20px', marginTop: '20px' }}>
                    Girişe Git
                </button>
            </div>
        );
    }

    if (loading) return <p>Yükleniyor...</p>;
    if (hata) return <p>Hata: {hata}</p>;

    return (
        <div className="baskan-sinav-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Sınav Programları (Onay ve İnceleme)</h2>
                <button onClick={() => setGosterInput(!gosterInput)}>+ Yeni Ekle</button>
            </div>

            {gosterInput && (
                <div style={{ margin: '15px 0', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
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

            <table className="sinav-table">
                <thead>
                    <tr>
                        <th>Sınav ID</th>
                        <th>Ders Adı</th>
                        <th>Başlangıç</th>
                        <th>Bitiş</th>
                        <th>Dönem</th>
                        <th>Onay Durumu</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {sinavlar.map((s) => (
                        <tr key={s.sinavId}>
                            <td>{s.sinavId}</td>
                            <td>{s.isim}</td>
                            <td>{s.baslangicTarihi}</td>
                            <td>{s.bitisTarihi}</td>
                            <td>{s.donem}</td>
                            <td>{s.onay === 1 ? "Onaylandı" : "Bekliyor"}</td>
                            <td>
                                <button className="onayla-btn" onClick={() => handleOnayla(s.sinavId)}>Onayla</button>
                                <button className="duzenle-btn" onClick={() => handleDuzenle(s.sinavId)}>Düzenle</button>
                                <button className="detay-btn" onClick={() => handleDetay(s.sinavId)}>İçeriği Görüntüle</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BaskanSinavProgrami;
