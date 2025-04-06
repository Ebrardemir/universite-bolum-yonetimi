import React from 'react'

function Teachers() {
  const teachers = ["kaplan kaplan", "zeki", "hakan", "hakan", "hakan", "hakan", "hakan"];

  const handleDragStart = (e, teachers) => {
    e.dataTransfer.setData('text/plain', teachers);
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
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>Öğretim Görevlileri</h2>
      <div>
        {teachers.map((teacher) => (
          <p
            key={teacher}
            draggable
            onDragStart={(e) => handleDragStart(e, teacher)}
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
            {teacher}
          </p>
        ))}
      </div>
    </div>
  )
}

export default Teachers