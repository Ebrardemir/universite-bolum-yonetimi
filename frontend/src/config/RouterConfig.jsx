import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import FirstPage from '../pages/FirstPage'
import Home from '../pages/Home'
import CourseSchedule from '../pages/CourseSchedule'

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<FirstPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/course-schedule' element={<CourseSchedule />} />

        </Routes>
    )
}

export default RouterConfig