import React, { useState } from 'react';
import Lessons from '../components/Lessons';
import Teachers from '../components/Teachers';

const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'];
const hours = Array.from({ length: 13 }, (_, i) => {
  const start = 8 + i;
  const end = start + 1;
  return `${start.toString().padStart(2, '0')}:00 - ${end.toString().padStart(2, '0')}:00`;
});

function LessonTable() {
  const [schedule, setSchedule] = useState({});

  const handleDrop = (e, day, hour) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    if (!data) return;

    const newSchedule = { ...schedule };
    if (!newSchedule[day]) newSchedule[day] = {};
    if (!newSchedule[day][hour]) newSchedule[day][hour] = [];
    newSchedule[day][hour].push(data);

    setSchedule(newSchedule);
  };

  const handleRemove = (day, hour, index) => {
    const newSchedule = { ...schedule };
    if (newSchedule[day] && newSchedule[day][hour]) {
      newSchedule[day][hour].splice(index, 1);
      if (newSchedule[day][hour].length === 0) {
        delete newSchedule[day][hour];
        if (Object.keys(newSchedule[day]).length === 0) {
          delete newSchedule[day];
        }
      }
    }
    setSchedule(newSchedule);
  };

  const renderBadge = (text, index, day, hour) => {
    const isTeacher = ['kaplan kaplan', 'zeki', 'hakan'].includes(text.toLowerCase());
    return (
      <div
        key={index}
        style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: isTeacher ? '#e0f7fa' : '#fce4ec',
          color: '#333',
          padding: '4px 8px',
          borderRadius: '12px',
          margin: '4px 0', // üstten alttan boşluk
          fontSize: '13px',
          width: 'fit-content'
        }}
      >
        {text}
        <button
          onClick={() => handleRemove(day, hour, index)}
          style={{
            marginLeft: '6px',
            background: 'transparent',
            border: 'none',
            color: 'red',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ×
        </button>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '250px' }}>
        <div style={{ minHeight: '320px' }}>
          <Lessons />
        </div>
        <div style={{ minHeight: '320px' }}>
          <Teachers />
        </div>
      </div>

      <div style={{ overflowX: 'auto', flexGrow: 1 }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: '700px', textAlign: 'center' }}>
          <thead>
            <tr>
              <th style={cellStyle}>Saat</th>
              {days.map((day) => (
                <th key={day} style={cellStyle}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hours.map((hour, rowIdx) => (
              <tr key={rowIdx}>
                <td style={{ ...cellStyle, fontWeight: 'bold', backgroundColor: '#f2f2f2' }}>{hour}</td>
                {days.map((day) => (
                  <td
                    key={day}
                    onDrop={(e) => handleDrop(e, day, hour)}
                    onDragOver={(e) => e.preventDefault()}
                    style={{
                      ...cellStyle,
                      backgroundColor: '#fff',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                      {schedule[day]?.[hour]?.map((entry, index) => renderBadge(entry, index, day, hour))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cellStyle = {
  border: '1px solid #ccc',
  padding: '10px',
  minWidth: '100px',
  height: '60px',
  verticalAlign: 'top'
};

export default LessonTable;

