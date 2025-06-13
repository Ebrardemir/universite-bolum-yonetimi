import React from 'react'
import { Routes, Route } from 'react-router-dom'

/* Ortak Sayfalar */
import Login from '../pages/Login'
import FirstPage from '../pages/FirstPage'
import Home from '../pages/Home'

/* Bölüm Başkanı */
import BaskanDashboard from '../pages/bolumbaskani/BaskanDashboard'
import KullaniciYetkilendirme from '../pages/bolumbaskani/KullaniciYetkilendirme'
import BolumBaskaniPaneli from '../pages/bolumbaskani/BolumBaskaniPaneli'

/* Akademik Personel */
import AkademikDashboard from '../pages/akademikpersonel/AkademikDash'
import AkademikPersonelPaneli from '../pages/akademikpersonel/AkademikPersonelPaneli'
import DersProgrami from '../pages/akademikpersonel/CourseSchedule'
import SinavProgrami from '../pages/akademikpersonel/ExamSchedule'
import ShowExamSeatPlanPage from '../pages/akademikpersonel/ShowExamSeatPlanPage'

/* Sekreter */
import SekreterDashboard from '../pages/sekreter/SekreterDash'
import SekreterPaneli from '../pages/sekreter/SekreterPaneli'
import DersProgramiSekreter from '../pages/sekreter/CourseSchedule'
import KullaniciKayit from '../pages/sekreter/KullaniciKayit'
import SinavProgramiIslemleri from '../pages/sekreter/sinavProgrami'
import SinavProgramiDetay from '../pages/sekreter/sinavProgrami'
import SinavProgramiListe from '../pages/sekreter/sinavProgramiListe'

function RouterConfig() {
    return (
        <Routes>
            {/* Ortak Sayfalar */}
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<FirstPage />} />

            {/* Bölüm Başkanı */}
            <Route path='/baskan' element={<BaskanDashboard />} />
            <Route path='/baskan-yetki' element={<KullaniciYetkilendirme />} />
            <Route path='/bolum-panel' element={<BolumBaskaniPaneli />} />

            {/* Akademik Personel */}
            <Route path='/akademik-personel' element={<AkademikDashboard />} />
            <Route path='/akademik-panel' element={<AkademikPersonelPaneli />} />
            <Route path='/ders-programi' element={<DersProgrami />} />
            <Route path='/sinav-programi' element={<SinavProgrami />} />
            <Route path='/sinav-oturma-duzeni-goruntule' element={<ShowExamSeatPlanPage />} />

            {/* Sekreter */}
            <Route path='/sekreter' element={<SekreterDashboard />} />
            <Route path='/sekreter-panel' element={<SekreterPaneli />} />
            <Route path='/ders-programi-islemleri' element={<DersProgramiSekreter />} />
            <Route path='/kullanici-kayit' element={<KullaniciKayit />} />
            <Route path='/sinav-programi-islemleri' element={<SinavProgramiIslemleri />} />
            <Route path='/sinav-programi-liste' element={<SinavProgramiListe />} />
            <Route path='/sinav-programi/:sinavId' element={<SinavProgramiDetay />} />
        </Routes>
    )
}

export default RouterConfig
