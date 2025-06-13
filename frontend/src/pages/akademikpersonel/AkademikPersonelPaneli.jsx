import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/akademikpersonel/panel.css';
import logo from '../../images/kou.png';
import CourseSchedule from './CourseSchedule';
import ExamSchedule from './ExamSchedule';

const AkademikPersonelPaneli = () => {
    const [aktifModul, setAktifModul] = useState();
    const navigate = useNavigate();

    const renderIcerik = () => {
        switch (aktifModul) {

            case 'ders-programi':
                return <CourseSchedule />
            case 'sinav-programi':
                return <ExamSchedule />

        }
    };

    return (
        <div className="panel-container">
            <aside className="sidebar">
                <h2 className="panel-title">Akademik Personel Paneli</h2>
                <img src={logo} alt="KOÜ Logo" />
                <h3>Modüller</h3>
                <ul>
                    <li onClick={() => setAktifModul('ders-programi')}>📚 Ders Programım</li>
                    <li onClick={() => setAktifModul('sinav-programi')}>📝 Sınav Programım</li>
                </ul>

            </aside>
            <main className="content-area">
                {renderIcerik()}
            </main>
        </div>
    );
};

export default AkademikPersonelPaneli;
