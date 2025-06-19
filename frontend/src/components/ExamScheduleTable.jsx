import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const ExamScheduleTable = () => {
    const [groups, setGroups] = useState([]);
    const [notMap, setNotMap] = useState({});
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [activeNotId, setActiveNotId] = useState(null);
    const [activeExamId, setActiveExamId] = useState(null);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const gorevliId = localStorage.getItem('userId');

                // Tüm sınav içerikleri (her biri DtoSinav)
                const examsRes = await axios.get(`${API_URL}/rest/api/sinav/${gorevliId}/listele-gozetmen`, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
                const exams = examsRes.data || [];

                // Sadece benzersiz SINAV_TABLE id'leri
                const uniqueSinavTableIds = [...new Set(exams.map(e => e.sinavId))];

                const tempMap = {}; // Notları geçici map'te tut

                const groupsData = await Promise.all(
                    uniqueSinavTableIds.map(async sinavTableId => {
                        // Aynı grup için SINAV_TABLE ve o gruptaki exams:
                        const [tableRes] = await Promise.all([
                            axios.get(`${API_URL}/rest/api/sinav-table/${sinavTableId}/getir`, {
                                headers: { "ngrok-skip-browser-warning": "69420" }
                            }),
                        ]);
                        const table = tableRes.data;

                        // Bu gruptaki exams:
                        const filteredExams = exams.filter(e => e.sinavId === sinavTableId);

                        // Bu gruptaki exams'lerin gerçek DtoSinav.id'lerini al ve her biri için not getir:
                        await Promise.all(
                            filteredExams.map(async exam => {
                                const notRes = await axios.get(`${API_URL}/rest/api/not/${exam.id}/getir-sinav`, {
                                    headers: { "ngrok-skip-browser-warning": "69420" }
                                });
                                const notes = notRes.data || [];
                                notes.forEach(n => {
                                    tempMap[n.sinavId] = n; // Notu exam.id'ye bağla
                                });
                            })
                        );

                        return { table, exams: filteredExams };
                    })
                );

                setGroups(groupsData);
                setNotMap(tempMap);
            } catch (err) {
                console.error("Veri alınırken hata:", err);
            }
        };

        fetchAll();
    }, []);

    const openNoteModal = (exam) => {
        const existing = notMap[exam.id]; // exam.id => DtoSinav.id
        setActiveExamId(exam.id);          // Not için gerçek exam.id
        setActiveNotId(existing?.id || null);
        setNoteText(existing?.gorevliNot || '');
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setNoteText('');
        setActiveExamId(null);
        setActiveNotId(null);
    };

    const saveNote = async () => {
        const gorevliId = localStorage.getItem('userId');
        try {
            if (activeNotId) {
                // 🔑 PUT: Yeni notu body'de gönder
                await axios.put(`${API_URL}/rest/api/not/${activeNotId}/guncelle`, {
                    gorevliNot: noteText
                }, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
                alert("Not güncellendi.");
            } else {
                // POST: yeni kayıt
                await axios.post(`${API_URL}/rest/api/not/save/sinav`, {
                    sinavId: activeExamId,
                    gorevliId,
                    gorevliNot: noteText,
                    dersProgramiIcerikId: null
                }, {
                    headers: { "ngrok-skip-browser-warning": "69420" }
                });
                alert("Not eklendi.");
            }
            closeModal();
            window.location.reload();
        } catch (err) {
            console.error(err);
            alert("Bir hata oluştu.");
        }
    };


    return (
        <div style={{ padding: "20px" }}>
            {groups.map(group => (
                <div key={group.table.sinavId} style={{ marginBottom: "40px", border: "1px solid #ddd", borderRadius: "8px", padding: "20px" }}>
                    <h2>{group.table.isim}</h2>
                    <p><strong>Tarih Aralığı:</strong> {group.table.baslangicTarihi} - {group.table.bitisTarihi}</p>
                    <p><strong>Onay Durumu:</strong> {group.table.onay === 1 ? "Onaylandı" : "Bekliyor"}</p>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
                        {group.exams.map(exam => (
                            <div key={exam.id} style={{ border: "1px solid #eee", padding: "16px", borderRadius: "8px", width: "250px" }}>
                                <p><strong>Tarih:</strong> {exam.sinavTarih}</p>
                                <p><strong>Saat:</strong> {exam.baslangicSaati} - {exam.bitisSaati}</p>
                                <p><strong>Ders:</strong> {exam.ders?.dersAdi || "—"}</p>
                                <p><strong>Derslik(ler):</strong> {(exam.derslikler || []).map(d => d.derslikAdi).join(", ") || "—"}</p>
                                <p><strong>Görevli:</strong> {exam.gorevli ? `${exam.gorevli.unvan} ${exam.gorevli.isim} ${exam.gorevli.soyisim}` : "—"}</p>

                                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                                    <button
                                        onClick={() => openNoteModal(exam)}
                                        style={{ ...buttonStyle, backgroundColor: "#10b981" }}
                                    >
                                        {notMap[exam.id] ? "Not Güncelle" : "Not Ekle"}
                                    </button>

                                    <button
                                        onClick={() => navigate(`/sinav-oturma-duzeni/${exam.id}`)}
                                        style={buttonStyle}
                                    >
                                        Oturma Düzeni Görüntüle
                                    </button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Not {activeNotId ? "Güncelle" : "Ekle"}</h3>
                        <textarea
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Notunuzu buraya yazın..."
                            rows={5}
                            style={{ width: "90%", padding: "10px", fontSize: "16px" }}
                        ></textarea>
                        <div style={{ marginTop: "15px", textAlign: "right" }}>
                            <button onClick={closeModal} style={{ marginRight: "10px" }}>İptal</button>
                            <button onClick={saveNote} style={{ ...buttonStyle, backgroundColor: "#10b981" }}>
                                {activeNotId ? "Güncelle" : "Kaydet"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const buttonStyle = {
    backgroundColor: "#6366f1",
    color: "white",
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
};

const modalOverlayStyle = {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
};

const modalContentStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    maxWidth: "90%",
};

export default ExamScheduleTable;
