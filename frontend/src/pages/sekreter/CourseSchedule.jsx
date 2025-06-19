import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SelectClass from '../../components/SelectClass';
import SelectTerm from '../../components/SelectTerm';
import PageContainer from '../../container/PageContainer';

import LessonTable from '../../components/LessonTable';
import GenerateScheduleButton from '../../components/GenerateScheduleButton';

function CourseSchedule() {
    const navigate = useNavigate();

    // ✅ Yetki kontrolü
    const [yetkiliMi, setYetkiliMi] = useState(false);

    useEffect(() => {
        const rolId = Number(localStorage.getItem('rolId'));
        if (rolId === 1 || rolId === 2) {
            setYetkiliMi(true);
        } else {
            setYetkiliMi(false);
        }
    }, []);

    const handleLogoutAndRedirect = () => {
        localStorage.removeItem('rolId');
        localStorage.removeItem('userId');
        navigate('/');
    };

    // ✅ Yetkisizse uyarı + buton
    if (!yetkiliMi) {
        return (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
                <h2>Bu sayfaya erişmek için yetkili giriş yapmalısınız.</h2>
                <button
                    onClick={handleLogoutAndRedirect}
                    style={{ padding: '10px 20px', marginTop: '20px' }}
                >
                    Girişe Git
                </button>
            </div>
        );
    }

    return (
        <div>
            <PageContainer>
                {/* İçerik buraya eklenebilir */}
            </PageContainer>
            <LessonTable />
        </div>
    );
}

export default CourseSchedule;
