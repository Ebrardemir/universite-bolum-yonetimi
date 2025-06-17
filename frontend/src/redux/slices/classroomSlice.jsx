import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchClassrooms = createAsyncThunk('classrooms/fetchClassrooms', async () => {
    const response = await axios.get(`${API_URL}/rest/api/derslik/getir-all`, {
        headers: {
            'ngrok-skip-browser-warning': '69420'
        }
    });
    console.log(response.data)
    return response.data;
});

const classroomSlice = createSlice({
    name: 'classrooms',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassrooms.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchClassrooms.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchClassrooms.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default classroomSlice.reducer;
