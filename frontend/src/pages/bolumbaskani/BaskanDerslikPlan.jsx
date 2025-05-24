import React, { useState } from 'react';
import '../../css/bolumbaskani/baskanDerslikPlan.css';

const BaskanDerslikPlan = () => {
  const [derslikler] = useState([
    {
      id: 1,
      derslikAdi: "D101",
      fakulte: "Mühendislik Fakültesi",
      bolumId: 1,
      kapasite: 60,
      sinavKapasite: 45
    },
    {
      id: 2,
      derslikAdi: "C201",
      fakulte: "Fen-Edebiyat Fakültesi",
      bolumId: 1,
      kapasite: 50,
      sinavKapasite: 40
    }
  ]);

  const handleDetay = (derslikAdi) => {
    alert(`"${derslikAdi}" için detaylı uygunluk bilgisi (mock)`);
  };

  return (
    <div className="baskan-derslik-container">
      <h2>Derslik Kullanım ve Kapasite Planı</h2>
      <table className="derslik-table">
        <thead>
          <tr>
            <th>Derslik Adı</th>
            <th>Fakülte</th>
            <th>Kapasite</th>
            <th>Sınav Kapasitesi</th>
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {derslikler.map((d) => (
            <tr key={d.id}>
              <td>{d.derslikAdi}</td>
              <td>{d.fakulte}</td>
              <td>{d.kapasite}</td>
              <td>{d.sinavKapasite}</td>
              <td>
                <button className="detay-btn" onClick={() => handleDetay(d.derslikAdi)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BaskanDerslikPlan;
