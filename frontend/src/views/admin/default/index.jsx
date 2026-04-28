import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreFront = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const navigate = useNavigate();

    const categories = ["Tümü", "Roman", "Bilim Kurgu", "Fantastik", "Dünya Klasikleri", "Kişisel Gelişim", "Çocuk"];

    const fetchBooks = async () => {
        const res = await axios.get("http://127.0.0.1:8000/api/books");
        setBooks(res.data);
    };

    useEffect(() => { fetchBooks(); }, []);

    const handleSearch = async () => {
        const res = await axios.get(`http://127.0.0.1:8000/api/books?search=${searchTerm}`);
        setBooks(res.data);
    };

    const displayedBooks = books.filter(book => selectedCategory === "Tümü" || book.category === selectedCategory);

    return (
        <div style={{ padding: "40px", fontFamily: "Arial", backgroundColor: "#f3f4f6", minHeight: "100vh" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h1 style={{ color: "#333" }}>KitapÜssü</h1>
                <button onClick={() => navigate('/login')} style={{ padding: "12px 24px", backgroundColor: "#ea580c", color: "white", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: "bold" }}>
                    Admin Girişi
                </button>
            </div>

            {/* Kategori Çubuğu */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "25px", overflowX: "auto" }}>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: "10px 20px", backgroundColor: selectedCategory === cat ? "#ea580c" : "white", color: selectedCategory === cat ? "white" : "#4b5563", border: "1px solid #d1d5db", borderRadius: "20px", cursor: "pointer" }}>
                        {cat}
                    </button>
                ))}
            </div>

            {/* Arama ve Kitaplar (Aynı Kalıyor) */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "25px" }}>
                {displayedBooks.map(book => (
                    <div key={book.id} style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                        <img src={book.image_url || "https://via.placeholder.com/150"} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
                        <h3 style={{ fontSize: "16px", marginTop: "10px" }}>{book.title}</h3>
                        <p style={{ color: "#ea580c", fontWeight: "bold" }}>{book.price} TL</p>
                    </div>
                ))}
            </div>
            {/* RESET BUTONU BURADAN KALDIRILDI! */}
        </div>
    );
};

export default StoreFront;