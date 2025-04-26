import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import FirstPage from '../pages/FirstPage'
import Home from '../pages/Home'
import CourseSchedule from '../pages/CourseSchedule'
import PanelPage from '../pages/PanelPage'
import ShowExamSeatPlanPage from '../pages/ShowExamSeatPlanPage'


function RouterConfig() {
    return (
        <Routes>
         
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/course-schedule' element={<CourseSchedule />} />
            <Route path="/panel" element={<PanelPage />} />
            <Route path="/sinav-oturma-duzeni-goruntule" element={<ShowExamSeatPlanPage />} />


        </Routes>
    )
}

export default RouterConfig