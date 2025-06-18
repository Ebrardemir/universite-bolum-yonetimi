import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

const OturmaDuzeniKroki = () => {
    const { sinavAltId } = useParams();
    const [duzenList, setDuzenList] = useState([]);
    const [siraList, setSiraList] = useState({});
    const [pendingList, setPendingList] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const duzenRes = await axios.get(
                    `${API_URL}/rest/api/oturma-duzeni/getir-list/${sinavAltId}`,
                    { headers: { "ngrok-skip-browser-warning": "69420" } }
                );
                setDuzenList(duzenRes.data);

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

    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;

        const movingStudent = JSON.parse(draggableId);

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        const destKey = destination.droppableId;

        if (destKey !== "pending") {
            const destFull = duzenList.find(
                (o) => `${o.derslikId}-${o.siraNo}` === destKey
            );
            if (destFull) {
                alert("Bu hücre zaten dolu!");
                return;
            }
        }

        let newDuzen = [...duzenList];
        let newPending = [...pendingList];

        if (source.droppableId === "pending") {
            newPending = newPending.filter(
                (o) => o.ogrenciId !== movingStudent.ogrenciId
            );
        } else {
            newDuzen = newDuzen.filter(
                (o) => o.ogrenciId !== movingStudent.ogrenciId
            );
        }

        if (destination.droppableId === "pending") {
            newPending = [...newPending, movingStudent];
        } else {
            const [derslikId, siraNo] = destKey.split("-");
            newDuzen = [
                ...newDuzen,
                {
                    ...movingStudent,
                    derslikId: Number(derslikId),
                    siraNo: Number(siraNo),
                },
            ];
        }

        setPendingList(newPending);
        setDuzenList(newDuzen);
    };

    const handleSaveLayout = async () => {
        if (pendingList.length > 0) {
            alert("Bekleme alanında öğrenci var! Lütfen hepsini yerleştirin.");
            return;
        }

        const payload = duzenList.map((o) => ({
            id: o.id, // Eğer id varsa gönder, yoksa backend ignore eder
            ogrenciId: o.ogrenciId,
            derslikId: o.derslikId,
            siraNo: o.siraNo,
        }));

        try {
            await axios.put(
                `${API_URL}/rest/api/oturma-duzeni/guncelle`,
                payload,
                { headers: { "ngrok-skip-browser-warning": "69420" } }
            );
            alert("Yeni oturma düzeni başarıyla kaydedildi!");
        } catch (err) {
            console.error("Kaydetme hatası:", err);
            alert("Kaydetme sırasında bir hata oluştu!");
        }
    };


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
                        <Droppable
                            droppableId={`${derslikId}-${globalIndex}`}
                            key={`drop-${blkIdx}-${row}-${col}`}
                        >
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
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
                                    {ogr && (
                                        <Draggable
                                            draggableId={JSON.stringify(ogr)}
                                            index={0}
                                        >
                                            {(provided2, snapshot) => (
                                                <div
                                                    ref={provided2.innerRef}
                                                    {...provided2.draggableProps}
                                                    {...provided2.dragHandleProps}
                                                    style={{
                                                        ...provided2.draggableProps.style,
                                                        background: "transparent",
                                                        border: "none",
                                                        padding: "0",
                                                        cursor: snapshot.isDragging ? "grabbing" : "grab",
                                                    }}
                                                >
                                                    {`${ogr.ogreniIsim} ${ogr.ogrenciSoyadi}`}
                                                </div>
                                            )}
                                        </Draggable>
                                    )}

                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
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
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {blocks}
                </div>
            </div>
        );
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ textAlign: "center" }}>
                <h1>Oturma Düzeni Kroki</h1>

                <button
                    onClick={handleSaveLayout}
                    style={{
                        padding: "10px 20px",
                        marginBottom: "20px",
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    Kaydet
                </button>

                <div
                    style={{
                        border: "2px dashed #999",
                        padding: "20px",
                        marginBottom: "40px",
                    }}
                >
                    <h3>Bekleme Alanı</h3>
                    <Droppable droppableId="pending" direction="horizontal">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    minHeight: "60px",
                                    justifyContent: "center",
                                }}
                            >
                                {pendingList.map((ogr, idx) => (
                                    <Draggable
                                        draggableId={JSON.stringify(ogr)}
                                        index={idx}
                                        key={ogr.ogrenciId}
                                    >
                                        {(provided2, snapshot) => (
                                            <div
                                                ref={provided2.innerRef}
                                                {...provided2.draggableProps}
                                                {...provided2.dragHandleProps}
                                                style={{
                                                    ...provided2.draggableProps.style,
                                                    border: "1px solid #333",
                                                    background: "#d0f0c0",
                                                    padding: "8px",
                                                    cursor: snapshot.isDragging ? "grabbing" : "grab",
                                                }}
                                            >
                                                {`${ogr.ogreniIsim} ${ogr.ogrenciSoyadi}`}
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>

                {Object.entries(siraList).map(([derslikId, siralar]) =>
                    renderDerslikGrid(derslikId, siralar)
                )}
            </div>
        </DragDropContext>
    );
};

export default OturmaDuzeniKroki;
