import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Teachers() {
  const [isOpen, setIsOpen] = useState(true);
  const teachers = useSelector((state) => state.schedule.data.ogretimGorevlileri) || [];


  const handleDragStart = (e, teacher) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      id: teacher.id,
      text: teacher,
      type: 'teacher'
    }));
  };

  return (
    <div style={{
      maxWidth: '400px',
      width: '100%',
      height: isOpen ? '320px' : '70px',
      overflowY: isOpen ? 'auto' : 'hidden',
      margin: '0px 0px',
      padding: '5px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
      boxSizing: 'border-box',
    }}>
      <h3
        style={{ textAlign: 'center', marginBottom: isOpen ? '15px' : '0', marginTop: isOpen ? '15px' : '3', cursor: 'pointer' }}
        onClick={() => setIsOpen(!isOpen)}
      >
        Öğretim Görevlileri
      </h3>

      {isOpen && (
        <div>
          {teachers.length === 0 && <p>Veri yok.</p>}
          {teachers.map((teacher) => (
            <p
              key={teacher.id}
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
              {teacher.unvan} {teacher.isim} {teacher.soyisim}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teachers;
