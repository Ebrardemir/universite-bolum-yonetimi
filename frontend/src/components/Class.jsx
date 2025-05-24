import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClassrooms } from '../redux/slices/classroomSlice';

function Class() {
    const [isOpen, setIsOpen] = useState(true); // Başlangıçta açık

    const classrooms = useSelector((state) => state.schedule.data.derslikler) || [];

   

    const handleDragStart = (e, classroom) => {
        e.dataTransfer.setData(
          'text/plain',
          JSON.stringify({
            id: classroom.id,
            text: classroom,
            type: 'classroom'
          })
        );
      };
    return (
        <div
            style={{
                maxWidth: '400px',
                width: '100%',
                height: isOpen ? '320px' : '70px', // yükseklik küçülsün kapalıyken
                overflowY: isOpen ? 'auto' : 'hidden',
                margin: '0px 0px',
                padding: '5px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                boxSizing: 'border-box',
            }}
        >
            <h3
                style={{ textAlign: 'center', marginBottom: isOpen ? '15px' : '0', cursor: 'pointer' }}
                onClick={() => setIsOpen(!isOpen)}
            >
                Derslikler
            </h3>
            {isOpen && (
                <div>
                     {classrooms.length === 0 && <p>Veri yok.</p>}
                        {classrooms.map((c) => (
                            <p
                                key={c.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, c)}
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
                                {c.derslikAdi} ({c.kapasite} kişilik)
                            </p>
                        ))}
                </div>
            )}

        </div>
    )
}

export default Class