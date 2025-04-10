import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeachers = createAsyncThunk('teachers/fetchTeachers', async () => {
    const response = await axios.get('https://cbe4-176-89-130-221.ngrok-free.app/rest/api/gorevli/ogretim-elemanlari-list', {
        headers: {
            'ngrok-skip-browser-warning': '69420'
        }
    });
   
    console.log("BACKEND'DEN GELEN:", response.data);
    return response.data;
});

const teacherSlice = createSlice({
    name: 'teachers',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTeachers.fulfilled, (state, action) => {
                console.log("Fulfilled verisi:", action.payload);
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchTeachers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default teacherSlice.reducer;