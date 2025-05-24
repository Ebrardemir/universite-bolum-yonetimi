import React, { useState } from 'react';
import '../../css/bolumbaskani/baskanSinavProgrami.css';

const BaskanSinavProgrami = () => {
  const [sinavlar, setSinavlar] = useState([
    {
      id: 1,
      dersAdi: "Algoritmalar",
      sinavTarih: "2025-05-10",
      baslangicSaati: "10:00",
      bitisSaati: "11:30",
      derslikler: ["D101", "D102"],
      gozetmen: "Dr. Ayşe K."
    },
    {
      id: 2,
      dersAdi: "Veri Yapıları",
      sinavTarih: "2025-05-12",
      baslangicSaati: "13:00",
      bitisSaati: "14:30",
      derslikler: ["C201"],
      gozetmen: "Dr. Mehmet Y."
    }
  ]);

  const handleOnayla = (id) => {
    alert(`Sınav ID ${id} onaylandı (mock)`);
  };

  const handleDuzenle = (id) => {
    alert(`Sınav ID ${id} düzenlenecek (mock sayfa yok)`);
  };

  return (
    <div className="baskan-sinav-container">
      <h2>Sınav Programları (Onay ve İnceleme)</h2>
      <table className="sinav-table">
        <thead>
          <tr>
            <th>Tarih</th>
            <th>Saat</th>
            <th>Ders</th>
            <th>Derslik(ler)</th>
            <th>Gözetmen</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {sinavlar.map((s) => (
            <tr key={s.id}>
              <td>{s.sinavTarih}</td>
              <td>{s.baslangicSaati} - {s.bitisSaati}</td>
              <td>{s.dersAdi}</td>
              <td>{s.derslikler.join(', ')}</td>
              <td>{s.gozetmen}</td>
              <td>
                <button className="onayla-btn" onClick={() => handleOnayla(s.id)}>Onayla</button>
                <button className="duzenle-btn" onClick={() => handleDuzenle(s.id)}>Düzenle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaskanSinavProgrami;
