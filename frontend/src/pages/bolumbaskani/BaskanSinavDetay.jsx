import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Tablo için
import "../../css/bolumbaskani/baskanSinavProgrami.css";

const API_URL = import.meta.env.VITE_API_URL;

const BaskanSinavDetay = () => {
    const { sinavId } = useParams();
    const navigate = useNavigate();

    const [yetkiliMi, setYetkiliMi] = useState(false);
    const [veriler, setVeriler] = useState([]);
    const [hata, setHata] = useState(null);
    const [notMap, setNotMap] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [activeNoteText, setActiveNoteText] = useState("");

    useEffect(() => {
        const rolId = Number(localStorage.getItem("rolId"));
        setYetkiliMi(rolId === 1);
    }, []);

    const handleLogoutAndRedirect = () => {
        localStorage.clear();
        navigate("/");
    };

    useEffect(() => {
        if (!yetkiliMi) return;

        const fetchData = async () => {
            try {
                const res = await axios.get(`${API_URL}/rest/api/sinav/${sinavId}/listele`, {
                    headers: { "ngrok-skip-browser-warning": "69420" },
                });
                const data = res.data || [];
                setVeriler(data);

                const map = {};
                await Promise.all(
                    data.map(async (item) => {
                        const notRes = await axios.get(`${API_URL}/rest/api/not/${item.id}/getir-sinav`, {
                            headers: { "ngrok-skip-browser-warning": "69420" },
                        });
                        const notes = notRes.data || [];
                        if (notes.length > 0) {
                            map[item.id] = notes[0];
                        }
                    })
                );
                setNotMap(map);
            } catch (err) {
                console.error(err);
                setHata("Veri çekilemedi.");
            }
        };

        fetchData();
    }, [sinavId, yetkiliMi]);

    const handleGenelDuzenle = () => navigate(`/sinav-programi/${sinavId}`);
    const handleOturmaDuzeni = (sinavAltId) => navigate(`/oturma-duzeni-duzenle/${sinavAltId}`);

    const handleOtomatikOlustur = async (sinavAltId) => {
        try {
            await axios.get(`${API_URL}/rest/api/oturma-duzeni/olustur/${sinavAltId}`, {
                headers: { "ngrok-skip-browser-warning": "69420" },
            });
            alert("Otomatik oturma planı oluşturuldu!");
        } catch (err) {
            console.error(err);
            alert("Oluşturma başarısız.");
        }
    };

    const openNoteModal = (itemId) => {
        const note = notMap[itemId];
        if (note) {
            setActiveNoteText(note.gorevliNot);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setActiveNoteText("");
    };

    const handleGenelPdfOlustur = () => {
        const doc = new jsPDF();
        doc.setFontSize(14);
        doc.text(`Sınav Programı – ID: ${sinavId}`, 14, 15);

        const tableColumn = ["Ders", "Tarih / Saat", "Gözetmen", "Derslik(ler)"];
        const tableRows = [];

        veriler.forEach((item) => {
            const ders = item.ders?.dersAdi || "—";
            const tarihSaat = `${item.sinavTarih}\n${item.baslangicSaati} - ${item.bitisSaati}`;
            const gorevli = item.gorevli
                ? `${item.gorevli.unvan} ${item.gorevli.isim} ${item.gorevli.soyisim}`
                : `Gözetmen ID: ${item.gozetmenId}`;
            const derslik = item.derslikler?.map(d => d.derslikAdi || `ID: ${d.id}`).join(", ") || "—";

            tableRows.push([ders, tarihSaat, gorevli, derslik]);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 25,
        });

        doc.save(`sinav_programi_${sinavId}.pdf`);
    };

    if (!yetkiliMi) {
        return (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
                <h2>Bu sayfaya erişmek için bölüm başkanı girişi yapmalısınız.</h2>
                <button onClick={handleLogoutAndRedirect} style={{ padding: "10px 20px", marginTop: "20px" }}>
                    Girişe Git
                </button>
            </div>
        );
    }

    if (hata) return <p className="error-message">{hata}</p>;
    if (!veriler.length) return <p className="loading-message">Yükleniyor...</p>;

    return (
        <div className="baskan-sinav-container">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2>Sınav İçeriği – Sınav ID: {sinavId}</h2>
                <button onClick={handleGenelPdfOlustur} className="pdf-btn">📄 PDF Çıktısı Al</button>
            </div>

            <div className="action-buttons">
                <button className="duzenle-btn" onClick={handleGenelDuzenle}>
                    ✏️ Sınav Programını Düzenle
                </button>
            </div>

            <table className="sinav-table">
                <thead>
                    <tr>
                        <th>Ders</th>
                        <th>Tarih / Saat</th>
                        <th>Gözetmen</th>
                        <th>Derslik(ler)</th>
                        <th>İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {veriler.map((item, i) => (
                        <tr key={i}>
                            <td>
                                {item.ders?.dersAdi || "—"}
                                <br />
                                <small className="sub-info">Ders ID: {item.dersId}</small>
                            </td>
                            <td>
                                {item.sinavTarih}
                                <br />
                                <small>{item.baslangicSaati} - {item.bitisSaati}</small>
                            </td>
                            <td>
                                {item.gorevli
                                    ? `${item.gorevli.unvan} ${item.gorevli.isim} ${item.gorevli.soyisim}`
                                    : `Gözetmen ID: ${item.gozetmenId}`}
                            </td>
                            <td>
                                {item.derslikler?.length > 0
                                    ? item.derslikler.map(d => d.derslikAdi || `ID: ${d.id}`).join(", ")
                                    : "—"}
                            </td>
                            <td>
                                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                                    <button className="oturma-btn" onClick={() => handleOturmaDuzeni(item.id)}>
                                        🪑 Planı Düzenle
                                    </button>
                                    <button className="otomatik-btn" onClick={() => handleOtomatikOlustur(item.id)}>
                                        🧠 Otomatik Oluştur
                                    </button>
                                    {notMap[item.id] && (
                                        <button className="not-btn" onClick={() => openNoteModal(item.id)}>
                                            📄 Notu Görüntüle
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div style={modalOverlayStyle}>
                    <div style={modalContentStyle}>
                        <h3>Not Detayı</h3>
                        <p>{activeNoteText}</p>
                        <button onClick={closeModal} style={{ marginTop: "20px" }}>
                            Kapat
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BaskanSinavDetay;

const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
