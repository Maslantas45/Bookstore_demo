import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StoreFront = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("Tümü");
    const [cart, setCart] = useState([]); // SEPET STATE'İ
    const [isCartOpen, setIsCartOpen] = useState(false); // SEPET PENCERESİ AÇIK/KAPALI
    const navigate = useNavigate();

    const categories = ["Tümü", "Roman", "Bilim Kurgu", "Fantastik", "Dünya Klasikleri", "Kişisel Gelişim", "Çocuk"];

    const fetchBooks = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/books");
            setBooks(res.data);
        } catch (err) { console.error("Kitaplar çekilemedi", err); }
    };

    useEffect(() => { fetchBooks(); }, []);

    const handleSearch = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/api/books?search=${searchTerm}`);
            setBooks(res.data);
            setSelectedCategory("Tümü");
        } catch (err) { console.error("Arama hatası", err); }
    };

    // SEPETE EKLEME FONKSİYONU
    const addToCart = (book) => {
        setCart([...cart, book]);
        // Ufak bir animasyon veya bildirim hissi için konsola da yazdırabiliriz
        console.log(`${book.title} sepete eklendi!`);
    };

    // SEPET TOPLAM TUTAR HESAPLAMA
    const cartTotal = cart.reduce((total, item) => total + Number(item.price), 0).toFixed(2);

    const displayedBooks = books.filter(book => {
        if (selectedCategory === "Tümü") return true;
        return book.category === selectedCategory;
    });

    return (
        <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif" }}>

            <style>
                {`
          .book-card { transition: all 0.3s ease; }
          .book-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); }
          .category-scroll::-webkit-scrollbar { height: 6px; }
          .category-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
          .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px); z-index: 1000; display: flex; justify-content: center; align-items: center; }
          .add-btn:active { transform: scale(0.95); }
        `}
            </style>

            {/* MERKEZİ KONTEYNER */}
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>

                {/* HEADER */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", backgroundColor: "white", padding: "20px 30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "40px", height: "40px", backgroundColor: "#ea580c", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "900", fontSize: "24px" }}>
                            K
                        </div>
                        <h1 style={{ color: "#0f172a", margin: 0, fontSize: "28px", letterSpacing: "-1px" }}>KitapÜssü</h1>
                    </div>

                    {/* SAĞ ÜST BUTONLAR (SEPET VE ADMİN) */}
                    <div style={{ display: "flex", gap: "15px" }}>
                        <button
                            onClick={() => setIsCartOpen(true)}
                            style={{ padding: "10px 20px", backgroundColor: "#0f172a", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "800", display: "flex", alignItems: "center", gap: "8px", transition: "0.2s" }}>
                            🛒 Sepet <span style={{ backgroundColor: "#ea580c", padding: "2px 8px", borderRadius: "20px", fontSize: "14px" }}>{cart.length}</span>
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            style={{ padding: "10px 24px", backgroundColor: "#fff7ed", color: "#ea580c", border: "2px solid #ffedd5", borderRadius: "12px", cursor: "pointer", fontWeight: "800", transition: "0.2s" }}>
                            Admin Girişi
                        </button>
                    </div>
                </div>

                {/* ARAMA VE KATEGORİ */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", marginBottom: "40px" }}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            placeholder="Hangi kitabı arıyorsun? (Örn: Sefiller)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ flex: 1, padding: "16px 20px", borderRadius: "14px", border: "1px solid #e2e8f0", outline: "none", fontSize: "16px", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.02)" }}
                        />
                        <button
                            onClick={handleSearch}
                            style={{ padding: "0 30px", backgroundColor: "#ea580c", color: "white", border: "none", borderRadius: "14px", cursor: "pointer", fontWeight: "bold", fontSize: "16px", boxShadow: "0 4px 6px rgba(234, 88, 12, 0.2)" }}>
                            Ara
                        </button>
                    </div>

                    <div className="category-scroll" style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "10px" }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                style={{ padding: "10px 20px", backgroundColor: selectedCategory === cat ? "#0f172a" : "white", color: selectedCategory === cat ? "white" : "#64748b", border: selectedCategory === cat ? "1px solid #0f172a" : "1px solid #e2e8f0", borderRadius: "20px", cursor: "pointer", fontWeight: "600", whiteSpace: "nowrap", transition: "all 0.2s" }}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KİTAP KARTLARI */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "30px" }}>
                    {displayedBooks.length > 0 ? (
                        displayedBooks.map((book) => (
                            <div key={book.id} className="book-card" style={{ backgroundColor: "white", borderRadius: "20px", overflow: "hidden", position: "relative", border: "1px solid #f1f5f9" }}>
                                <div style={{ position: "absolute", top: "15px", left: "15px", backgroundColor: "rgba(255,255,255,0.95)", color: "#ea580c", padding: "6px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "800", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", zIndex: 1 }}>
                                    {book.category}
                                </div>
                                <img
                                    src={book.image_url || "https://via.placeholder.com/300x400?text=Resim+Yok"}
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/300x400?text=Resim+Yok" }}
                                    alt={book.title}
                                    style={{ width: "100%", height: "340px", objectFit: "cover", borderBottom: "1px solid #f1f5f9" }}
                                />
                                <div style={{ padding: "24px" }}>
                                    <h3 style={{ margin: "0 0 4px 0", fontSize: "20px", color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: "800" }}>{book.title}</h3>
                                    <p style={{ margin: "0 0 20px 0", fontSize: "14px", color: "#64748b", fontWeight: "500" }}>{book.author}</p>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <p style={{ margin: "0", fontWeight: "900", color: "#ea580c", fontSize: "22px" }}>
                                            {book.price} <span style={{ fontSize: "14px", color: "#94a3b8" }}>TL</span>
                                        </p>
                                        <button
                                            onClick={() => addToCart(book)}
                                            className="add-btn"
                                            style={{ padding: "10px 16px", backgroundColor: "#ea580c", color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", fontSize: "14px", transition: "background 0.2s" }}>
                                            Sepete Ekle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px", backgroundColor: "white", borderRadius: "16px" }}>
                            <p style={{ fontSize: "20px", color: "#64748b", fontWeight: "bold" }}>Bu kategoride kitap bulunamadı.</p>
                        </div>
                    )}
                </div>

            </div>

            {/* SEPET PENCERESİ (MODAL) */}
            {isCartOpen && (
                <div className="modal-overlay" onClick={() => setIsCartOpen(false)}>
                    <div onClick={(e) => e.stopPropagation()} style={{ backgroundColor: "white", padding: "30px", borderRadius: "20px", width: "90%", maxWidth: "500px", maxHeight: "80vh", overflowY: "auto", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
                        <h2 style={{ marginTop: 0, borderBottom: "2px solid #f1f5f9", paddingBottom: "15px", color: "#0f172a" }}>🛒 Sepetim</h2>

                        {cart.length === 0 ? (
                            <p style={{ color: "#64748b", textAlign: "center", padding: "30px 0" }}>Sepetinizde henüz kitap yok.</p>
                        ) : (
                            <ul style={{ listStyle: "none", padding: 0, margin: "20px 0" }}>
                                {cart.map((item, index) => (
                                    <li key={index} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                                        <span style={{ fontWeight: "600", color: "#334155" }}>{item.title}</span>
                                        <span style={{ color: "#ea580c", fontWeight: "bold" }}>{item.price} TL</span>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px", paddingTop: "20px", borderTop: "2px solid #f1f5f9" }}>
                            <span style={{ fontSize: "20px", fontWeight: "900", color: "#0f172a" }}>Toplam:</span>
                            <span style={{ fontSize: "24px", fontWeight: "900", color: "#ea580c" }}>{cartTotal} TL</span>
                        </div>

                        <button
                            onClick={() => setIsCartOpen(false)}
                            style={{ width: "100%", padding: "14px", marginTop: "25px", backgroundColor: "#0f172a", color: "white", border: "none", borderRadius: "12px", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}>
                            Alışverişe Dön
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default StoreFront;