import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = import.meta.env.VITE_API_URL;
const url = API_URL;

// ✅ Var olan bir ders programını ID ile getir + içerikleri + dersler + derslikler + hocalar
export const createFullScheduleData = createAsyncThunk(
    'schedule/createFullScheduleData',
    async ({ dersProgramiId }, thunkAPI) => {
        try {
            // 1️⃣ Programı getir
            const dersProgramiResponse = await fetch(`${url}/rest/api/ders-programi/${dersProgramiId}/getir`, {
                method: 'GET',
                headers: { 'ngrok-skip-browser-warning': '69420' },
            });

            if (!dersProgramiResponse.ok) {
                const text = await dersProgramiResponse.text();
                throw new Error('Ders programı getirilemedi:\n' + text);
            }

            const dersProgrami = await dersProgramiResponse.json();

            // ✅ Programdan sınıf ve dönem al
            const selectedClass = dersProgrami.sinif;
            const selectedSemester = dersProgrami.donem;

            thunkAPI.dispatch(setDersProgramiId(dersProgramiId));

            // 2️⃣ İçerik getir
            const icerikResponse = await fetch(
                `${url}/rest/api/ders-programi-icerik/${dersProgramiId}/getir-list`,
                {
                    method: 'GET',
                    headers: { 'ngrok-skip-browser-warning': '69420' },
                }
            );

            if (!icerikResponse.ok) {
                const text = await icerikResponse.text();
                throw new Error('Program içerikleri getirilemedi:\n' + text);
            }

            const icerikList = await icerikResponse.json();
            thunkAPI.dispatch(setProgramContents(icerikList));

            // 3️⃣ Dersleri getir
            const dersResponse = await fetch(`${url}/rest/api/ders/ders-list-for-ders-programi`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': '69420',
                },
                body: JSON.stringify({
                    sinif: selectedClass,
                    donem: selectedSemester,
                    bolumId: 1, // 🔑 sabit: 1
                    dersProgramiId: dersProgramiId,
                }),
            });

            if (!dersResponse.ok) {
                const text = await dersResponse.text();
                throw new Error('Dersler yüklenemedi:\n' + text);
            }

            const dersler = await dersResponse.json();

            // 4️⃣ Derslikleri getir
            const derslikResponse = await fetch(`${url}/rest/api/derslik/getir/1`, {
                method: 'GET',
                headers: { 'ngrok-skip-browser-warning': '69420' },
            });

            if (!derslikResponse.ok) {
                const text = await derslikResponse.text();
                throw new Error('Derslikler yüklenemedi:\n' + text);
            }

            const derslikler = await derslikResponse.json();

            // 5️⃣ Öğretim elemanlarını getir
            const ogretmenResponse = await fetch(`${url}/rest/api/gorevli/ogretim-elemanlari-list`, {
                method: 'GET',
                headers: { 'ngrok-skip-browser-warning': '69420' },
            });

            if (!ogretmenResponse.ok) {
                const text = await ogretmenResponse.text();
                throw new Error('Hocalar yüklenemedi:\n' + text);
            }

            const ogretimGorevlileri = await ogretmenResponse.json();

            return { dersler, derslikler, ogretimGorevlileri, dersProgrami };
        } catch (err) {
            return thunkAPI.rejectWithValue('Veri çekilirken hata oluştu: ' + err.message);
        }
    }
);

// ✅ İçerikleri backend'e kaydeden thunk
export const postSchedule = createAsyncThunk(
    'schedule/postSchedule',
    async (schedule, thunkAPI) => {
        const state = thunkAPI.getState();
        const dersProgramiId = state.schedule.id;

        const formatted = transformScheduleForBackend(schedule, dersProgramiId);

        // 🔑 PUT + path parametre kullan
        const response = await fetch(`${url}/rest/api/ders-programi-icerik/save/${dersProgramiId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': '69420'
            },
            body: JSON.stringify(formatted)
        });

        if (!response.ok) {
            throw new Error('Gönderim başarısız');
        }

        return await response.json();
    }
);

// ✅ Frontend verisini backend formatına çevir (artık içerik ID de eklenir)
const transformScheduleForBackend = (schedule, dersProgramiId) => {
    const result = [];

    for (const day in schedule) {
        for (const time in schedule[day]) {
            const items = schedule[day][time];
            if (items.length === 0) continue;

            const entry = {
                id: null,  // 🔑 yeni eklendi
                gun: day,
                baslangicSaati: time.split(' - ')[0],
                bitisSaati: time.split(' - ')[1],
                dersId: null,
                gorevliId: null,
                derslikId: null,
                saatSayisi: 1,
                dersProgramiId: dersProgramiId,
            };

            for (const item of items) {
                if (item.type === 'lesson') {
                    entry.dersId = item.text.id;
                    if (item.text.icerikId) entry.id = item.text.icerikId;
                }
                if (item.type === 'teacher') {
                    entry.gorevliId = item.text.id;
                    if (item.text.icerikId) entry.id = item.text.icerikId;
                }
                if (item.type === 'classroom') {
                    entry.derslikId = item.text.id;
                    if (item.text.icerikId) entry.id = item.text.icerikId;
                }
            }

            result.push(entry);
        }
    }

    return result;
};

// ✅ Slice
const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: {
        data: {},
        id: null,
        loadingPost: false,
        loadingCreate: false,
        error: null,
        programContents: [],
    },
    reducers: {
        setProgramContents(state, action) {
            state.programContents = action.payload;
        },
        setSchedule(state, action) {
            state.data = action.payload;
        },
        setDersProgramiId(state, action) {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(postSchedule.pending, (state) => {
                state.loadingPost = true;
                state.error = null;
            })
            .addCase(postSchedule.fulfilled, (state) => {
                state.loadingPost = false;
            })
            .addCase(postSchedule.rejected, (state, action) => {
                state.loadingPost = false;
                state.error = action.error.message;
            })
            .addCase(createFullScheduleData.pending, (state) => {
                state.loadingCreate = true;
                state.error = null;
            })
            .addCase(createFullScheduleData.fulfilled, (state, action) => {
                state.loadingCreate = false;
                state.data.dersler = action.payload.dersler;
                state.data.derslikler = action.payload.derslikler;
                state.data.ogretimGorevlileri = action.payload.ogretimGorevlileri;
                state.id = action.payload.dersProgrami.id;
                // İçerik ayrı GET ile set edildi
            })
            .addCase(createFullScheduleData.rejected, (state, action) => {
                state.loadingCreate = false;
                state.error = action.payload;
            });
    },
});

export const { setSchedule, setDersProgramiId, setProgramContents } = scheduleSlice.actions;
export default scheduleSlice.reducer;
