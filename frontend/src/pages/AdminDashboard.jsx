import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('adminToken')) navigate('/login');
        fetchBooks();
    }, [navigate]);

    const fetchBooks = async () => {
        const res = await axios.get("http://127.0.0.1:8000/api/books");
        setBooks(res.data);
    };

    const handleAdminReset = async () => {
        if (window.confirm("DİKKAT: Sistem 'Altın Duruma' sıfırlanacak!")) {
            await axios.post("http://127.0.0.1:8000/api/demo-reset");
            alert("Sistem tertemiz hale getirildi.");
            fetchBooks();
        }
    };

    return (
        <div style={{ padding: "40px", fontFamily: "Arial", backgroundColor: "#eff6ff", minHeight: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ color: "#1e3a8a" }}>KitapÜssü (Admin Önizleme)</h1>

                {/* KİTAP EKLEME PANELİNE GERİ DÖNÜŞ BUTONU */}
                <button onClick={() => navigate('/admin')} style={{ padding: "12px 24px", backgroundColor: "#1e40af", color: "white", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }}>
                    ⬅ Kitap Ekleme Paneline Dön
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {books.map(book => (
                    <div key={book.id} style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "2px dashed #bfdbfe" }}>
                        <h3 style={{ margin: "0 0 10px 0" }}>{book.title}</h3>
                        <p style={{ margin: "0", fontWeight: "bold", color: "#1e40af" }}>{book.price} TL</p>
                    </div>
                ))}
            </div>

            <button
                onClick={handleAdminReset}
                style={{ position: "fixed", bottom: "30px", right: "30px", backgroundColor: "#dc2626", color: "white", padding: "20px 40px", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "18px", boxShadow: "0 10px 15px rgba(0,0,0,0.2)" }}
            >
                SİSTEMİ SIFIRLA (ADMIN RESET)
            </button>
        </div>
    );
};

export default AdminDashboard;