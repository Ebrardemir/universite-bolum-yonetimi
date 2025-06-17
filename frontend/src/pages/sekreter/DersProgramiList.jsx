import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function DersProgramiList() {
    const [dersProgrami, setDersProgrami] = useState([]);
    const [newSinif, setNewSinif] = useState('1');
    const [newDonem, setNewDonem] = useState('1');

    const navigate = useNavigate();

    // 📌 Listeyi yükle
    const fetchDersProgramlari = async () => {
        try {
            const response = await fetch(`${API_URL}/rest/api/ders-programi/1/list`, {
                headers: { 'ngrok-skip-browser-warning': '69420' },
            });
            if (!response.ok) throw new Error('Veri çekilemedi');
            const data = await response.json();
            setDersProgrami(data);
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    useEffect(() => {
        fetchDersProgramlari();
    }, []);

    // 📌 Yeni ders programı ekle
    const handleAdd = async () => {
        const payload = {
            bolumId: 1,
            sinif: parseInt(newSinif),
            donem: parseInt(newDonem),
        };

        try {
            const response = await fetch(`${API_URL}/rest/api/ders-programi/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': '69420',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Bu ders programı zaten mevcut!');
            }

            const data = await response.json();
            alert(`Kaydedildi! ID: ${data.id}`);
            fetchDersProgramlari();
        } catch (error) {
            alert(error.message);
            console.error('Hata:', error);
        }
    };

    // 📌 Görüntüle butonuna tıklayınca
    const handleGoruntule = (ders) => {
        navigate(`/ders-programi-goruntule/${ders.id}`);
    };

    // 📌 Düzenle butonuna tıklayınca
    const handleDuzenle = (ders) => {
        navigate(`/ders-programi-islemleri/${ders.id}`);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Ders Programı Listesi</h2>

                <div style={styles.addContainer}>
                    <select
                        value={newSinif}
                        onChange={(e) => setNewSinif(e.target.value)}
                        style={styles.select}
                    >
                        <option value="1">1. Sınıf</option>
                        <option value="2">2. Sınıf</option>
                        <option value="3">3. Sınıf</option>
                        <option value="4">4. Sınıf</option>
                    </select>

                    <select
                        value={newDonem}
                        onChange={(e) => setNewDonem(e.target.value)}
                        style={styles.select}
                    >
                        <option value="1">1. Dönem</option>
                        <option value="2">2. Dönem</option>
                    </select>

                    <button onClick={handleAdd} style={styles.addButton}>Ekle</button>
                </div>
            </div>

            <div style={styles.list}>
                {dersProgrami.map((ders) => (
                    <div
                        key={ders.id}
                        style={styles.item}
                    >
                        <div>
                            <div><strong>Sınıf:</strong> {ders.sinif}</div>
                            <div><strong>Dönem:</strong> {ders.donem}</div>
                        </div>

                        <div style={styles.buttonContainer}>
                            <button style={styles.viewButton} onClick={() => handleGoruntule(ders)}>
                                Görüntüle
                            </button>
                            <button style={styles.editButton} onClick={() => handleDuzenle(ders)}>
                                Düzenle
                            </button>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    title: {
        margin: 0,
    },
    addContainer: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    addButton: {
        padding: '8px 16px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    item: {
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer: {
        display: 'flex',
        gap: '8px',
    },
    viewButton: {
        padding: '6px 12px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    editButton: {
        padding: '6px 12px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};
