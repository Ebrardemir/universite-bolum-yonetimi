import React from 'react';
import { useNavigate } from 'react-router-dom';


const ExamScheduleTable = ({ exams }) => {
    const navigate = useNavigate();
    return (
        <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden" }}>
            <thead style={{ backgroundColor: "#f3f4f6" }}>
                <tr>
                    <th style={thStyle}>Tarih</th>
                    <th style={thStyle}>Saat</th>
                    <th style={thStyle}>Ders</th>
                    <th style={thStyle}>Derslik</th>
                    <th style={thStyle}>Görevli</th>
                    <th style={thStyle}>Oturma Düzeni</th>
                </tr>
            </thead>
            <tbody>
                {exams.map((exam, index) => (
                    <tr key={index} style={{ textAlign: "center", borderBottom: "1px solid #e5e7eb" }}>
                        <td style={tdStyle}>{exam.date}</td>
                        <td style={tdStyle}>{exam.time}</td>
                        <td style={tdStyle}>{exam.lesson}</td>
                        <td style={tdStyle}>{exam.classroom}</td>
                        <td style={tdStyle}>{exam.teacher}</td>
                        <td style={tdStyle}>
                            <button onClick={() => navigate("/sinav-oturma-duzeni-goruntule", { state: exam })} style={buttonStyle}>Görüntüle</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

const thStyle = {
    padding: "12px",
    fontWeight: "600",
    color: "#374151",
    fontSize: "20px",
};

const tdStyle = {
    padding: "12px",
    fontSize: "16px",
    color: "#374151",
};

const buttonStyle = {
    backgroundColor: "#6366f1",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
};

export default ExamScheduleTable;
