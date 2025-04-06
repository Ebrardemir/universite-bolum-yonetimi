import React from 'react';

function Lessons() {
  const lessons = ['Matematik 1', 'Fizik 1', 'Programlama Lab 1', "Lab2", "lab2", "lba3"];

  const handleDragStart = (e, lesson) => {
    e.dataTransfer.setData('text/plain', lesson);
  };

  return (
    <div
      style={{
        maxWidth: '400px',
        width: '100%',
        height: '320px', // 🔹 Sabit yükseklik
        overflowY: 'auto', // 🔹 Yüksekliği aşarsa scroll aktif olur
        margin: '0px 0px',
        padding: '5px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        boxSizing: 'border-box',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Dersler</h2>
      <div>
        {lessons.map((lesson) => (
          <p
            key={lesson}
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
            {lesson}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Lessons;
