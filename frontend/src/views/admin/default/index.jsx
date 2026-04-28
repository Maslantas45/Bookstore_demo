import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/books");
            setBooks(res.data);
        } catch (err) {
            console.error("Veritabanına bağlanılamadı!", err);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleAdminReset = async () => {
        if (window.confirm("Sistem 'Altın Duruma' sıfırlanacak. Emin misin?")) {
            try {
                const res = await axios.post("http://127.0.0.1:8000/api/demo-reset");
                alert(res.data.message);
                fetchBooks(); // Tabloyu tazele
            } catch (err) {
                alert("Sıfırlama başarısız!");
            }
        }
    };

    return (
        <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ color: "#2d3748" }}>Bookstore Admin Paneli</h1>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
                <thead>
                <tr style={{ backgroundColor: "#edf2f7", textAlign: "left" }}>
                    <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>Kitap Adı</th>
                    <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>Yazar</th>
                    <th style={{ padding: "12px", border: "1px solid #dee2e6" }}>Fiyat</th>
                </tr>
                </thead>
                <tbody>
                {books.length > 0 ? (
                    books.map((book) => (
                        <tr key={book.id}>
                            <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{book.title}</td>
                            <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{book.author}</td>
                            <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>{book.price} TL</td>
                        </tr>
                    ))
                ) : (
                    <tr><td colSpan="3" style={{ padding: "20px", textAlign: "center" }}>Veri yükleniyor veya veritabanı boş...</td></tr>
                )}
                </tbody>
            </table>

            <button
                onClick={handleAdminReset}
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    backgroundColor: "#ed8936",
                    color: "white",
                    padding: "15px 30px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                }}
            >
                Admin Reset
            </button>
        </div>
    );
};

export default Dashboard;