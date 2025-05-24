import React from 'react';
import ExamScheduleTable from '../components/ExamScheduleTable';
import { examSchedule } from '../components/ExamData';

const ExamSchedule = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <h1 style={{ fontSize: "35px", fontWeight: "bold", marginBottom: "1.5rem" }}>Sınav Programım</h1>
            <ExamScheduleTable exams={examSchedule} />
        </div>
    );
};

export default ExamSchedule;
