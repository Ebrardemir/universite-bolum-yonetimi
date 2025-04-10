import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const createFullScheduleData = createAsyncThunk(
    'schedule/createFullScheduleData',
    async ({ sinif: selectedClass, donem: selectedSemester }, thunkAPI) => {
        try {
            const dersProgramiResponse = await fetch('https://cbe4-176-89-130-221.ngrok-free.app/rest/api/ders-programi/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' },
                body: JSON.stringify({
                    sinif: selectedClass,
                    donem: selectedSemester,
                    bolumId: 1
                }),
            });

            if (!dersProgramiResponse.ok) {
                const text = await dersProgramiResponse.text();
                throw new Error('Dersler yüklenemedi:\n' + text);
            }

            const dersProgrami = await dersProgramiResponse.json();
            const dersProgramiId = dersProgrami.id;
            thunkAPI.dispatch(setDersProgramiId(dersProgramiId));

            //  Eğer içerik listesi varsa Redux'a aktar
            if (dersProgrami.icerikList?.length > 0) {
                thunkAPI.dispatch(setProgramContents(dersProgrami.icerikList));

                // İçerik listesini düzgün bir şekilde yazdır
                console.log("AAAAAAAAAAA: ", JSON.stringify(dersProgrami.icerikList, null, 2));  // JSON.stringify ile okunabilir hale getirilmiş içerik
            }


            // 2. Dersleri al (POST)
            const dersResponse = await fetch('https://cbe4-176-89-130-221.ngrok-free.app/rest/api/ders/ders-list-for-ders-programi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': '69420' },
                body: JSON.stringify({
                    sinif: selectedClass,
                    donem: selectedSemester,
                    bolumId: 1,
                    dersProgramiId: dersProgramiId
                }),
            });

            if (!dersResponse.ok) {
                const text = await dersResponse.text();
                throw new Error('Dersler yüklenemedi:\n' + text);
            }

            const dersler = await dersResponse.json();

            // 3. Derslikleri al (GET)
            const derslikResponse = await fetch(`https://cbe4-176-89-130-221.ngrok-free.app/rest/api/derslik/getir/${1}`, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': '69420'
                }
            });

            if (!derslikResponse.ok) {
                const text = await derslikResponse.text();
                throw new Error('Derslikler yüklenemedi:\n' + text);
            }
            const derslikler = await derslikResponse.json();

            // 4. Öğretim elemanlarını al (GET)
            const ogretmenResponse = await fetch(`https://cbe4-176-89-130-221.ngrok-free.app/rest/api/gorevli/ogretim-elemanlari-list`, {
                method: 'GET',
                headers: {
                    'ngrok-skip-browser-warning': '69420'
                }
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



//Ders programını gönderen async thunk
export const postSchedule = createAsyncThunk(
    'schedule/postSchedule',
    async (schedule, thunkAPI) => {
        const state = thunkAPI.getState();
        const dersProgramiId = state.schedule.id;

        console.log("Ders Programı ID:", dersProgramiId);

        const formatted = transformScheduleForBackend(schedule, dersProgramiId);

        const response = await fetch('https://cbe4-176-89-130-221.ngrok-free.app/rest/api/ders-programi-icerik/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formatted)
        });

        if (!response.ok) {
            throw new Error('Gönderim başarısız');
        }

        return await response.json();
    }
);


const transformScheduleForBackend = (schedule, dersProgramiId) => {
    const result = [];

    for (const day in schedule) {
        for (const time in schedule[day]) {
            const items = schedule[day][time];

            // Sadece kullanıcı tarafından eklenen itemlar
            const filtered = items.filter(item => item.readonly !== true);

            if (filtered.length === 0) continue; // Eğer kullanıcı eklemediyse geç
            const entry = {
                gun: day,
                baslangicSaati: time.split(" - ")[0],
                bitisSaati: time.split(" - ")[1],
                dersId: null,
                gorevliId: null,
                derslikId: null,
                saatSayisi: 1, // İstersen burada dinamik hesaplayabilirsin
                dersProgramiId: dersProgramiId,
            };

            for (const item of schedule[day][time]) {
                if (item.type === 'lesson') entry.dersId = item.text.id;
                if (item.type === 'teacher') entry.gorevliId = item.text.id;
                if (item.type === 'classroom') entry.derslikId = item.text.id;
            }

            result.push(entry);
        }
    }

    return result;
};


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
        }
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
                state.programContents = action.payload.dersProgrami?.icerikList || [];
                state.id = action.payload.dersProgrami.id;
            })
            .addCase(createFullScheduleData.rejected, (state, action) => {
                state.loadingCreate = false;
                state.error = action.payload;
            });


    }
});

export const { setSchedule, setDersProgramiId, setProgramContents } = scheduleSlice.actions;
export default scheduleSlice.reducer;
