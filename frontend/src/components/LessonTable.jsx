import React, { useState, useEffect } from 'react';
import Lessons from '../components/Lessons';
import Teachers from '../components/Teachers';
import Classrooms from '../components/Class';
import { useDispatch, useSelector } from 'react-redux';
import { postSchedule } from '../redux/slices/scheduleSlice';

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const hours = Array.from({ length: 13 }, (_, i) => {
  const start = 8 + i;
  const end = start + 1;
  return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});



function LessonTable() {
  const [schedule, setSchedule] = useState({});
  const [lessonHours, setLessonHours] = useState({});
  const dispatch = useDispatch();
  const { loading, error, programContents } = useSelector((state) => state.schedule);
  const dersler = useSelector((state) => state.schedule.data.dersler || []);
  useEffect(() => {
    const initial = {};
    dersler.forEach(d => {
      initial[d.id] = d.saatSayisi || 0;
    });
    setLessonHours(initial);
  }, [dersler]);
  useEffect(() => {
    if (!programContents || programContents.length === 0) return;

    const converted = {};

    programContents.forEach((entry) => {
      const saat = `${entry.baslangicSaati.slice(0, 5)} - ${entry.bitisSaati.slice(0, 5)}`;
      const gun = entry.gun;

      if (!converted[gun]) converted[gun] = {};
      if (!converted[gun][saat]) converted[gun][saat] = [];

      if (entry.dersAdi) {
        converted[gun][saat].push({
          type: 'lesson',
          readonly: true,
          text: {
            id: entry.dersId,
            dersAdi: entry.dersAdi,
            alanKisiSayisi: entry.saatSayisi ?? 1 // varsa kişi sayısı
          }
        });
      }

      if (entry.isim && entry.soyisim) {
        converted[gun][saat].push({
          type: 'teacher',
          readonly: true,
          text: {
            unvan: entry.unvan || '',
            isim: entry.isim,
            soyisim: entry.soyisim
          }
        });
      }
      if (entry.derslikAdi) {
        converted[gun][saat].push({
          type: 'classroom',
          readonly: true,
          text: {
            derslikAdi: entry.derslikAdi,
            kapasite: 50

          }
        });
      }

      // Eğer derslik verisi de geliyorsa burada ekleyebilirsin
      // if (entry.derslikAdi) { ... }
    });

    setSchedule(converted);
  }, [programContents]);

  const handleDrop = (e, day, hour) => {
    e.preventDefault();
    const rawData = e.dataTransfer.getData('text/plain');
    if (!rawData) return;

    let parsed;
    try {
      parsed = JSON.parse(rawData);
    } catch {
      return;
    }

    const { text, type } = parsed;

    if (type === 'lesson') {
      const dersId = text.id;
      if (lessonHours[dersId] <= 0) {
        alert('Bu dersin tüm saatleri tabloya yerleştirildi.');
        return;
      }

      setLessonHours(prev => ({
        ...prev,
        [dersId]: prev[dersId] - 1
      }));
    }

    const newSchedule = { ...schedule };
    if (!newSchedule[day]) newSchedule[day] = {};
    if (!newSchedule[day][hour]) newSchedule[day][hour] = [];

    const alreadyExists = newSchedule[day][hour].some((item) => item.type === type);
    if (alreadyExists) return;

    newSchedule[day][hour].push({ text, type });
    setSchedule(newSchedule);
  };


  const handleSubmit = () => {
    dispatch(postSchedule(schedule))
      .unwrap()
      .then(() => alert('Program başarıyla gönderildi!'))
      .catch((err) => alert('Hata oluştu: ' + err));
  };

  const handleRemove = (day, hour, index) => {
    const newSchedule = { ...schedule };
    const item = newSchedule[day]?.[hour]?.[index]; // silinecek öğe
  
    if (!item) return;
  
    // Eğer bu bir ders ise, kalan saatini 1 artır
    if (item.type === 'lesson' && item.text.id) {
      setLessonHours(prev => ({
        ...prev,
        [item.text.id]: (prev[item.text.id] || 0) + 1
      }));
    }
  
    // Silme işlemi
    newSchedule[day][hour].splice(index, 1);
    if (newSchedule[day][hour].length === 0) {
      delete newSchedule[day][hour];
      if (Object.keys(newSchedule[day]).length === 0) {
        delete newSchedule[day];
      }
    }
  
    setSchedule(newSchedule);
  };
  
  

  const renderBadge = (item, index, day, hour) => {
    let backgroundColor = '#fce4ec';
    let textToShow = '';

    if (item.type === 'teacher' && typeof item.text === 'object') {
      backgroundColor = '#e0f7fa';
      textToShow = `${item.text.unvan} ${item.text.isim} ${item.text.soyisim}`;
    } else if (item.type === 'classroom' && typeof item.text === 'object') {
      backgroundColor = '#ede7f6';
      textToShow = `${item.text.derslikAdi} (${item.text.kapasite} kişilik)`;
    } else if (item.type === 'lesson' && typeof item.text === 'object') {
      backgroundColor = '#fce4ec';
      textToShow = `${item.text.dersAdi} (${item.text.alanKisiSayisi} kişi)`;
    } else {
      textToShow = String(item.text); // fallback (güvenlik)
    }
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor,
          color: '#333',
          padding: '4px 8px',
          borderRadius: '12px',
          margin: '4px 0',
          fontSize: '13px',
          width: 'fit-content',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        {textToShow}
        <button
          onClick={() => handleRemove(day, hour, index)}
          style={{
            marginLeft: '6px',
            background: 'transparent',
            border: 'none',
            color: 'red',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          x
        </button>
      </div>
    );
  };


  return (
    <div>
      <div
        style={{
          width: '97%',
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '20px',
          paddingBottom: '0',
        }}
      >
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: '14px',
            backgroundColor: loading ? '#90caf9' : '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          {loading ? 'Kaydediliyor...' : 'Programı Kaydet'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            width: '250px',
            position: 'sticky',
            top: '20px',
            alignSelf: 'flex-start',
            zIndex: 1,
          }}
        >
          <Lessons lessonHours={lessonHours} />
          <Teachers />
          <Classrooms />
        </div>

        <div style={{ overflowX: 'auto', flexGrow: 1 }}>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              minWidth: '700px',
              textAlign: 'center',
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    ...cellStyle,
                    borderTop: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    position: 'sticky',
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Saat
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    style={{
                      ...cellStyle,
                      borderTop: '1px solid #ccc',
                      backgroundColor: '#f9f9f9',
                      position: 'sticky',
                      top: 0,
                      zIndex: 2,
                    }}
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour, rowIdx) => (
                <tr key={rowIdx}>
                  <td
                    style={{
                      ...cellStyle,
                      fontWeight: 'bold',
                      backgroundColor: '#f2f2f2',
                    }}
                  >
                    {hour}
                  </td>
                  {days.map((day) => (
                    <td
                      key={day}
                      onDrop={(e) => handleDrop(e, day, hour)}
                      onDragOver={(e) => e.preventDefault()}
                      style={{
                        ...cellStyle,
                        backgroundColor: '#fff',
                        position: 'relative',
                        transition: 'background-color 0.2s ease-in-out',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        {schedule[day]?.[hour]?.map((entry, index) =>
                          renderBadge(entry, index, day, hour)
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  minWidth: '100px',
  height: '60px',
  verticalAlign: 'top',
};

export default LessonTable;
