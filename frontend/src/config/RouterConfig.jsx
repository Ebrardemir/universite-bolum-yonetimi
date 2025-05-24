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



        </Routes>
    )
}

export default RouterConfig