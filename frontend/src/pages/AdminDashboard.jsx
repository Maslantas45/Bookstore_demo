import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('adminToken')) navigate('/login');
        else fetchBooks();
    }, [navigate]);

    const fetchBooks = async () => {
        const res = await axios.get("http://127.0.0.1:8000/api/books");
        setBooks(res.data);
    };

    const handleAdminReset = async () => {
        if (window.confirm("DİKKAT: Sistem 'Altın Duruma' (Pazarlama Demosu) sıfırlanacak. Onaylıyor musunuz?")) {
            try {
                await axios.post("http://127.0.0.1:8000/api/demo-reset");
                alert("Sistem başarıyla temizlendi ve satışa hazır hale getirildi.");
                fetchBooks();
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    alert("Token süreniz dolmuş, tekrar giriş yapın!");
                    localStorage.removeItem('adminToken');
                    navigate('/login');
                }
            }
        }
    };

    return (
        <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, sans-serif", paddingBottom: "100px" }}>

            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>

                {/* HEADER */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", borderBottom: "1px solid #1e293b", paddingBottom: "20px" }}>
                    <div>
                        <h1 style={{ color: "white", margin: 0, fontSize: "28px" }}>Demo Önizleme <span style={{ color: "#ef4444", fontSize: "14px", verticalAlign: "middle", backgroundColor: "rgba(239, 68, 68, 0.2)", padding: "4px 8px", borderRadius: "8px" }}>GİZLİ PANEL</span></h1>
                        <p style={{ color: "#94a3b8", margin: "5px 0 0 0" }}>Sistemin müşteri tarafındaki canlı görünümü</p>
                    </div>
                    <button onClick={() => navigate('/admin')} style={{ padding: "12px 24px", backgroundColor: "#1e293b", color: "white", border: "1px solid #334155", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = "#334155"}
                            onMouseLeave={(e) => e.target.style.backgroundColor = "#1e293b"}>
                        ⬅ Kontrol Paneline Dön
                    </button>
                </div>

                {/* KİTAPLAR (Dark Mode Basit Kartlar) */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
                    {books.map(book => (
                        <div key={book.id} style={{ backgroundColor: "#1e293b", padding: "20px", borderRadius: "16px", border: "1px solid #334155" }}>
                            <div style={{ fontSize: "12px", color: "#cbd5e1", marginBottom: "10px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px" }}>{book.category}</div>
                            <h3 style={{ margin: "0 0 10px 0", color: "white", fontSize: "18px" }}>{book.title}</h3>
                            <p style={{ margin: "0", fontWeight: "900", color: "#ea580c", fontSize: "20px" }}>{book.price} <span style={{ fontSize: "14px", color: "#64748b" }}>TL</span></p>
                        </div>
                    ))}
                </div>

            </div>

            {/* DEVASA RESET BUTONU */}
            <div style={{ position: "fixed", bottom: "0", left: "0", width: "100%", backgroundColor: "rgba(15, 23, 42, 0.9)", backdropFilter: "blur(10px)", padding: "20px", borderTop: "1px solid #334155", display: "flex", justifyContent: "center" }}>
                <button
                    onClick={handleAdminReset}
                    style={{ padding: "20px 60px", backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "16px", cursor: "pointer", fontWeight: "900", fontSize: "20px", letterSpacing: "1px", boxShadow: "0 10px 25px -5px rgba(220, 38, 38, 0.4)", display: "flex", alignItems: "center", gap: "10px", transition: "transform 0.1s" }}
                    onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
                    onMouseUp={(e) => e.target.style.transform = "scale(1)"}
                >
                    ⚠️ SİSTEMİ FABRİKA AYARLARINA SIFIRLA
                </button>
            </div>

        </div>
    );
};

export default AdminDashboard;