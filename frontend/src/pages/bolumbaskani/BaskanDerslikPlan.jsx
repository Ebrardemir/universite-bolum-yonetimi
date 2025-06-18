import React, { useEffect, useState } from 'react';
import '../../css/bolumbaskani/baskanDerslikPlan.css';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

const BaskanDerslikPlan = () => {
    const [derslikler, setDerslikler] = useState([]);
    const bolumId = 1; // Sabit

    const fetchDerslikler = async () => {
        try {
            const response = await fetch(`${API_URL}/rest/api/derslik/getir/${bolumId}`, {
                headers: { "ngrok-skip-browser-warning": "69420" },
            });
            if (!response.ok) throw new Error('Derslikler yüklenemedi');
            const data = await response.json();
            setDerslikler(data);
        } catch (error) {
            console.error('API Hatası:', error);
            alert('Derslikler yüklenirken bir hata oluştu.');
        }
    };

    useEffect(() => {
        fetchDerslikler();
    }, []);



    // üstte ekle
    const navigate = useNavigate();

    const handleDetay = (derslikId) => {
        navigate(`/baskan-derslik-detay/${derslikId}`);
    };


    return (
        <div className="baskan-derslik-container">
            <h2>Derslik Kullanım ve Kapasite Planı</h2>
            <table className="derslik-table">
                <thead>
                    <tr>
                        <th>Derslik Adı</th>
                        <th>Kapasite</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {derslikler.map((d) => (
                        <tr key={d.id}>
                            <td>{d.derslikAdi}</td>
                            <td>{d.kapasite}</td>
                            <td>
                                <button onClick={() => handleDetay(d.id)}>Detay</button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BaskanDerslikPlan;
