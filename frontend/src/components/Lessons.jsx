import React from 'react';
import { useSelector } from 'react-redux';

function Lessons({ lessonHours }) {
  const lessons = useSelector((state) => state.schedule.data.dersler) || [];

  const handleDragStart = (e, lesson) => {
    e.dataTransfer.setData(
      'text/plain',
      JSON.stringify({
        text: lesson,
        type: 'lesson'
      })
    );
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        width: '100%',
        height: '320px', // height fixed to avoid shrinking
        overflowY: 'auto',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
      }}
    >
      <h3
        style={{
          textAlign: 'center',
          marginBottom: '15px',
          cursor: 'pointer',
        }}
      >
        Dersler
      </h3>

      <div>
        {lessons.length === 0 && <p>Veri yok.</p>}
        {lessons.map((lesson, i) => (
          <p
            key={i}
            draggable
            onDragStart={(e) => handleDragStart(e, lesson)}
            style={{
              margin: '5px 0',
              fontSize: '16px',
              padding: '10px',
              border: '1px solid #aaa',
              borderRadius: '4px',
              backgroundColor: '#fff',
              cursor: 'grab',
              userSelect: 'none',
            }}
          >
            {lesson.dersAdi} ({lesson.alanKisiSayisi}) - Kalan Saat: {lessonHours[lesson.id] || 0}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
