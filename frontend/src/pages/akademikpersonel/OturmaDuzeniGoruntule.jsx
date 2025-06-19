import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OturmaDuzeniGoruntule = () => {
    const { sinavAltId } = useParams();
    const [duzenList, setDuzenList] = useState([]);
    const [siraList, setSiraList] = useState({});
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const duzenRes = await axios.get(
                    `${API_URL}/rest/api/oturma-duzeni/getir-list/${sinavAltId}`,
                    { headers: { "ngrok-skip-browser-warning": "69420" } }
                );
                setDuzenList(duzenRes.data);

                if (duzenRes.data.length === 0) {
                    // Eğer oturma düzeni yoksa siraList boş kalsın
                    return;
                }

                const derslikIds = [...new Set(duzenRes.data.map((d) => d.derslikId))];
                const promises = derslikIds.map((id) =>
                    axios.get(`${API_URL}/rest/api/derslik-sira/${id}/getir-list`, {
                        headers: { "ngrok-skip-browser-warning": "69420" },
                    })
                );
                const results = await Promise.all(promises);

                const temp = {};
                derslikIds.forEach((id, idx) => {
                    temp[id] = results[idx].data;
                });
                setSiraList(temp);
            } catch (err) {
                console.error("API Hatası:", err);
            }
        };
        fetchData();
    }, [API_URL, sinavAltId]);

    const renderDerslikGrid = (derslikId, siralar) => {
        const derslikStudents = duzenList
            .filter((d) => d.derslikId === Number(derslikId))
            .sort((a, b) => a.siraNo - b.siraNo);

        const derslikAdi = derslikStudents[0]?.derslikAdi || `ID: ${derslikId}`;
        const sortedSiralar = [...siralar].sort((a, b) => a.siraNo - b.siraNo);

        const blocks = [];
        let globalIndex = 1;

        sortedSiralar.forEach((blk, blkIdx) => {
            const blkCells = [];
            for (let row = 0; row < blk.siraAdet; row++) {
                for (let col = 0; col < blk.siraKapasite; col++) {
                    const ogr = derslikStudents.find((o) => o.siraNo === globalIndex);
                    blkCells.push(
                        <div
                            key={`cell-${blkIdx}-${row}-${col}`}
                            style={{
                                border: "1px solid #333",
                                minWidth: "80px",
                                minHeight: "40px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                background: ogr ? "#c8f7c5" : "#eee",
                                margin: "6px",
                            }}
                        >
                            {ogr ? `${ogr.ogreniIsim} ${ogr.ogrenciSoyadi}` : ""}
                        </div>
                    );
                    globalIndex++;
                }
            }

            blocks.push(
                <div
                    key={`block-${blkIdx}`}
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${blk.siraKapasite}, auto)`,
                        gridTemplateRows: `repeat(${blk.siraAdet}, auto)`,
                        border: "2px solid black",
                        marginRight: "20px",
                    }}
                >
                    {blkCells}
                </div>
            );
        });

        return (
            <div key={derslikId} style={{ marginBottom: "50px" }}>
                <h2>{derslikAdi}</h2>
                <div style={{ display: "flex", justifyContent: "center" }}>{blocks}</div>
            </div>
        );
    };

    return (
        <div style={{ textAlign: "center" }}>
            <h1>Oturma Düzeni Görüntüle</h1>

            {duzenList.length === 0 ? (
                <p style={{ fontSize: "18px", marginTop: "40px" }}>
                    Oturma düzeni henüz oluşturulmamış.
                </p>
            ) : (
                Object.entries(siraList).map(([derslikId, siralar]) =>
                    renderDerslikGrid(derslikId, siralar)
                )
            )}
        </div>
    );
};

export default OturmaDuzeniGoruntule;
