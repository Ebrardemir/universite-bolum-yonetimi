import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../css/bolumbaskani/baskanSinavProgrami.css";

const API_URL = import.meta.env.VITE_API_URL;

const BaskanSinavDetay = () => {
  const { sinavId } = useParams();
  const navigate = useNavigate();
  const [veriler, setVeriler] = useState([]);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/rest/api/sinav/${sinavId}/listele`, {
        headers: { "ngrok-skip-browser-warning": "69420" },
      })
      .then((res) => setVeriler(res.data))
      .catch((err) => {
        console.error(err);
        setHata("Veri çekilemedi.");
      });
  }, [sinavId]);

  const handleGenelDuzenle = () => {
    navigate(`/sinav-programi/${sinavId}`);
  };

  const handleOturmaDuzeni = (sinavAltId) => {
    navigate(`/oturma-duzeni-olustur/${sinavAltId}`);
  };

  const handleOtomatikOlustur = async (sinavAltId) => {
    try {
      await axios.get(
        `${API_URL}/rest/api/oturma-duzeni/olustur/${sinavAltId}`,
        {
          headers: { "ngrok-skip-browser-warning": "69420" },
        }
      );
      alert("Otomatik oturma planı oluşturuldu!");
    } catch (err) {
      console.error(err);
      alert("Oluşturma başarısız.");
    }
  };

  if (hata) return <p className="error-message">{hata}</p>;
  if (!veriler.length) return <p className="loading-message">Yükleniyor...</p>;

  return (
    <div className="baskan-sinav-container">
      <h2>Sınav İçeriği – Sınav ID: {sinavId}</h2>

      <div className="action-buttons">
        <button className="duzenle-btn" onClick={handleGenelDuzenle}>
          ✏️ Sınav Programını Düzenle
        </button>
      </div>

      <table className="sinav-table">
        <thead>
          <tr>
            <th>Ders</th>
            <th>Tarih / Saat</th>
            <th>Gözetmen</th>
            <th>Derslik(ler)</th>
            <th>Oturma Planı</th>
          </tr>
        </thead>
        <tbody>
          {veriler.map((item, i) => (
            <tr key={i}>
              <td>
                {item.ders?.dersAdi || "—"}
                <br />
                <small className="sub-info">Ders ID: {item.dersId}</small>
              </td>
              <td>
                {item.sinavTarih}
                <br />
                <small>
                  {item.baslangicSaati} - {item.bitisSaati}
                </small>
              </td>
              <td>
                {item.gorevli
                  ? `${item.gorevli.unvan} ${item.gorevli.isim} ${item.gorevli.soyisim}`
                  : `Gözetmen ID: ${item.gozetmenId}`}
              </td>
              <td>
                {item.derslikler?.length > 0
                  ? item.derslikler
                      .map((d) => d.derslikAdi || `ID: ${d.id}`)
                      .join(", ")
                  : "—"}
              </td>
              <td>
                <div className="action-buttons-inline">
                  <button
                    className="oturma-btn"
                    onClick={() => handleOturmaDuzeni(item.id)} 
                  >
                    🪑 Planı Düzenle
                  </button>
                  <button
                    className="otomatik-btn"
                    onClick={() => handleOtomatikOlustur(item.id)}
                  >
                    🧠 Otomatik Oluştur
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaskanSinavDetay;
