import React from 'react';
import { useLocation } from 'react-router-dom';

const ShowExamSeatPlan = () => {
  const location = useLocation();
  const exam = location.state;

  const students = Array.from({ length: 15 }, (_, i) => ({
    name: `Öğrenci ${i + 1}`,
    seatNumber: i + 1 // her öğrenciye sıra numarası veriyoruz
  }));

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "1.5rem" }}>Sınav Oturma Düzeni</h1>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Ders:</strong> {exam.lesson}<br/>
        <strong>Tarih:</strong> {exam.date}<br/>
        <strong>Saat:</strong> {exam.time}<br/>
        <strong>Derslik:</strong> {exam.classroom}
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "12px",
        marginTop: "2rem"
      }}>
        {students.map((student, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            textAlign: "center",
            backgroundColor: "#f9fafb",
          }}>
            {student.name} : {student.seatNumber}. sıra
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowExamSeatPlan;
