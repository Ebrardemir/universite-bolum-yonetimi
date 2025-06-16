import React, { useEffect, useState } from "react";
import "../../css/bolumbaskani/baskanSinavProgrami.css";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const BaskanSinavProgrami = () => {
  const navigate = useNavigate(); 
  const [sinavlar, setSinavlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hata, setHata] = useState(null);
  useEffect(() => {
    fetch("https://4c14-5-24-197-23.ngrok-free.app/rest/api/sinav-table/1/getir/list", {
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
  }, []);
  
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
        alert(`Sınav ID ${id} başarıyla onaylandı `);
  
        
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

  if (loading) return <p>Yükleniyor...</p>;
  if (hata) return <p>Hata: {hata}</p>;

  return (
    <div className="baskan-sinav-container">
      <h2>Sınav Programları (Onay ve İnceleme)</h2>
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
