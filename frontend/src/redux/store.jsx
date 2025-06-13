import { configureStore } from '@reduxjs/toolkit'
import scheduleReducer from '../redux/slices/scheduleSlice'
import lessonReducer from '../redux/slices/lessonSlice'
import teacherReducer from '../redux/slices/teacherSlice';
import classroomReducer from '../redux/slices/classroomSlice';
import selectionReducer from '../redux/slices/selectionSlice';

export const store = configureStore({
    reducer: {
        schedule: scheduleReducer,
        lessons: lessonReducer,
        teachers: teacherReducer,
        classrooms: classroomReducer,
        selection: selectionReducer
    }
})