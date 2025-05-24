import React, { useState } from 'react';
import KullaniciYetkilendirme from './KullaniciYetkilendirme';
import '../../css/bolumbaskani/panelLayout.css';
import logo from '../../images/kou.png';

const BolumBaskaniPaneli = () => {
  const [aktifModul, setAktifModul] = useState('yetkilendirme');

  const renderIcerik = () => {
    switch (aktifModul) {
      case 'yetkilendirme':
        return <KullaniciYetkilendirme />;
      case 'ders-programi':
        return <div>Ders Programı Modülü (hazırlanıyor)</div>;
      case 'sinav-programi':
        return <div>Sınav Programı Modülü (hazırlanıyor)</div>;
      default:
        return <div>Modül bulunamadı.</div>;
    }
  };

  return (
    <div className="panel-container">
      <aside className="sidebar">
      <h2 className="panel-title">Bölüm Başkanı Paneli</h2>
      <img src={logo} alt="KOÜ Logo" />
        <h3>Modüller</h3>
        <ul>
          <li onClick={() => setAktifModul('yetkilendirme')}>👥 Kullanıcı Yetkilendirme</li>
          <li onClick={() => setAktifModul('ders-programi')}>📚 Ders Programı</li>
          <li onClick={() => setAktifModul('sinav-programi')}>📝 Sınav Programı</li>
          <li onClick={() => setAktifModul('oturma-duzeni')}>🪑 Sınav Oturma Düzeni</li>
        </ul>
        
      </aside>
      <main className="content-area">
        {renderIcerik()}
      </main>
    </div>
  );
};

export default BolumBaskaniPaneli;
