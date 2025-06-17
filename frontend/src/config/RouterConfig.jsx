import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import FirstPage from '../pages/FirstPage'
import Home from '../pages/Home'
import CourseSchedule from '../pages/CourseSchedule'
import PanelPage from '../pages/PanelPage'
import ShowExamSeatPlanPage from '../pages/ShowExamSeatPlanPage'
import BaskanDashboard from '../pages/bolumbaskani/BaskanDashboard';
import KullaniciYetkilendirme from '../pages/bolumbaskani/KullaniciYetkilendirme';
import BolumBaskaniPaneli from '../pages/bolumbaskani/BolumBaskaniPaneli';
import BaskanSinavProgrami from '../pages/bolumbaskani/BaskanSinavProgrami';
import BaskanSinavDuzenle from '../pages/bolumbaskani/BaskanSinavProgramiDuzenle'; 
import BaskanSinavDetay from '../pages/bolumbaskani/BaskanSinavDetay';


function RouterConfig() {
    return (
        <Routes>

            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/course-schedule' element={<CourseSchedule />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/sinav-oturma-duzeni-goruntule" element={<ShowExamSeatPlanPage />} />
            <Route path="/baskan" element={<BaskanDashboard />} />
            <Route path="/baskan-yetki" element={<KullaniciYetkilendirme />} />
            <Route path="/bolum-panel" element={<BolumBaskaniPaneli />} />
            <Route path="/baskan-sinav-programi" element={<BaskanSinavProgrami />} />
            <Route path="/sinav-programi/:sinavId" element={<BaskanSinavDuzenle />} />
            <Route path="/sinav-detay/:sinavId" element={<BaskanSinavDetay />} />
            



        </Routes>
    )
}

export default RouterConfig