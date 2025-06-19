import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ navigate için ekledik
import '../../css/bolumbaskani/kullaniciYetkilendirme.css';

const API_URL = import.meta.env.VITE_API_URL;

const KullaniciYetkilendirme = () => {
    const navigate = useNavigate(); // ✅ navigate hazır

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

    // ✅ Mevcut state'ler
    const [users, setUsers] = useState([]);
    const [roller, setRoller] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        if (!yetkiliMi) return;

        // Kullanıcıları çek
        fetch(`${API_URL}/rest/api/gorevli/1/list-getir`, {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error("Kullanıcılar alınamadı:", err));

        // Roller çek
        fetch(`${API_URL}/rest/api/rol/getir-list`, {
            headers: { 'ngrok-skip-browser-warning': '69420' }
        })
            .then(res => res.json())
            .then(data => setRoller(data))
            .catch(err => console.error("Roller alınamadı:", err));
    }, [yetkiliMi]);

    const handleRolGuncelle = (userId, yeniRolId) => {
        fetch(`${API_URL}/rest/api/gorevli/guncelle/rol`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "69420"
            },
            body: JSON.stringify({ id: userId, rolId: yeniRolId })
        })
            .then(res => {
                if (!res.ok) throw new Error("Rol güncelleme başarısız");
                alert("Rol başarıyla güncellendi ");
                setUsers(prev => prev.map(u => u.id === userId ? { ...u, rolId: yeniRolId } : u));
                setEditIndex(null);
            })
            .catch(err => alert("Hata: " + err.message));
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

    return (
        <div className="kullanici-yonetimi-container">
            <h2>Kullanıcı Yetkilendirme</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Ad Soyad</th>
                        <th>Kullanıcı Adı</th>
                        <th>Rol</th>
                        <th>İşlem</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, i) => (
                        <tr key={u.id}>
                            <td>{u.isim} {u.soyisim}</td>
                            <td>{u.kullaniciAdi}</td>
                            <td>
                                {editIndex === i ? (
                                    <select
                                        value={u.rolId}
                                        onChange={(e) =>
                                            setUsers(prev =>
                                                prev.map((user, idx) =>
                                                    idx === i ? { ...user, rolId: parseInt(e.target.value) } : user
                                                )
                                            )
                                        }
                                    >
                                        {roller.map((rol) => (
                                            <option key={rol.id} value={rol.id}>{rol.rol}</option>
                                        ))}
                                    </select>
                                ) : (
                                    roller.find(r => r.id === u.rolId)?.rol || "Bilinmiyor"
                                )}
                            </td>
                            <td>
                                <div className="action-buttons">
                                    {editIndex === i ? (
                                        <button className="kaydet" onClick={() => handleRolGuncelle(u.id, u.rolId)}>Kaydet</button>
                                    ) : (
                                        <button className="duzenle" onClick={() => setEditIndex(i)}>Düzenle</button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="modul-yetki-info">
                <h3>Modül Yetkileri (Gelecek Özellik)</h3>
                <p>Bu alanda her kullanıcıya erişebileceği modülleri özel olarak atayabileceğiz – gerekli ise.</p>
            </div>
        </div>
    );
};

export default KullaniciYetkilendirme;
