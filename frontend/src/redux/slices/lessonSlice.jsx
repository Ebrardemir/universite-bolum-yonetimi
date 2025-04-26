import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchLessons = createAsyncThunk(
    'schedule/fetchLessons',
    async ({ sinif, donem, bolumId }, thunkAPI) => {
      try {
        const response = await fetch('https://.../rest/api/ders/bolum-ders-list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sinif, donem, bolumId })
        });
        const data = await response.json();
        return data; // ders listesi
      } catch (err) {
        return thunkAPI.rejectWithValue(err.message || 'Hata oluştu');
      }
    }
  );
  

const lessonSlice = createSlice({
    name: 'lessons',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLessons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLessons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchLessons.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default lessonSlice.reducer;
