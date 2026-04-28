import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({ title: '', author: '', category: 'Roman', price: '', image_url: '' });
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        if (!token) navigate('/login');
        else fetchBooks();
    }, [navigate, token]);

    const fetchBooks = async () => {
        const res = await axios.get('http://127.0.0.1:8000/api/books');
        setBooks(res.data);
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://127.0.0.1:8000/api/books', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Kitap başarıyla eklendi!");
            fetchBooks();
            setFormData({ title: '', author: '', category: 'Roman', price: '', image_url: '' });
        } catch (err) {
            if (err.response && err.response.status === 401) {
                alert("Oturum süreniz dolmuş. Lütfen tekrar giriş yapın.");
                localStorage.removeItem('adminToken');
                navigate('/login');
            } else {
                alert("Hata! Kitap eklenemedi.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    return (
        <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>

            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>

                {/* HEADER */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", backgroundColor: "white", padding: "20px 30px", borderRadius: "16px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div style={{ width: "40px", height: "40px", backgroundColor: "#0f172a", borderRadius: "10px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "900", fontSize: "24px" }}>
                            A
                        </div>
                        <h1 style={{ color: "#0f172a", margin: 0, fontSize: "24px", fontWeight: "800" }}>Admin Paneli</h1>
                    </div>
                    <div style={{ display: "flex", gap: "15px" }}>
                        <button onClick={() => navigate('/admin/preview')} style={{ padding: '10px 20px', backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', transition: "0.2s" }}>
                            👀 Demoyu Görüntüle
                        </button>
                        <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Çıkış Yap
                        </button>
                    </div>
                </div>

                {/* KİTAP EKLEME FORMU */}
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                    <h2 style={{ marginTop: 0, color: '#0f172a', borderBottom: "2px solid #f1f5f9", paddingBottom: "15px", marginBottom: "20px" }}>➕ Yeni Kitap Ekle</h2>
                    <form onSubmit={handleAddBook} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <input placeholder="Kitap Adı" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ padding: '14px', border: '2px solid #e2e8f0', borderRadius: '12px', outline: "none", fontSize: "15px" }} />
                        <input placeholder="Yazar" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} style={{ padding: '14px', border: '2px solid #e2e8f0', borderRadius: '12px', outline: "none", fontSize: "15px" }} />

                        <div style={{ display: "flex", gap: "20px" }}>
                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ flex: 1, padding: '14px', border: '2px solid #e2e8f0', borderRadius: '12px', outline: "none", fontSize: "15px", backgroundColor: "white" }}>
                                <option>Roman</option><option>Bilim Kurgu</option><option>Fantastik</option><option>Dünya Klasikleri</option><option>Kişisel Gelişim</option><option>Çocuk</option>
                            </select>
                            <input placeholder="Fiyat (TL)" type="number" step="0.01" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: "120px", padding: '14px', border: '2px solid #e2e8f0', borderRadius: '12px', outline: "none", fontSize: "15px" }} />
                        </div>

                        <input placeholder="Görsel URL (İsteğe Bağlı)" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} style={{ padding: '14px', border: '2px solid #e2e8f0', borderRadius: '12px', outline: "none", fontSize: "15px" }} />

                        <button type="submit" style={{ gridColumn: "1 / -1", padding: '16px', backgroundColor: '#ea580c', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: "16px", boxShadow: "0 4px 6px rgba(234, 88, 12, 0.2)" }}>
                            Sisteme Kaydet
                        </button>
                    </form>
                </div>

                {/* SİSTEMDEKİ KİTAPLAR LİSTESİ */}
                <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ marginTop: 0, color: '#0f172a', borderBottom: "2px solid #f1f5f9", paddingBottom: "15px", marginBottom: "20px" }}>📚 Envanterdeki Kitaplar ({books.length})</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {books.map(b => (
                            <div key={b.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center", padding: '16px', backgroundColor: "#f8fafc", borderRadius: "12px", border: "1px solid #f1f5f9" }}>
                                <div>
                                    <strong style={{ fontSize: "16px", color: "#0f172a", display: "block" }}>{b.title}</strong>
                                    <span style={{ fontSize: "14px", color: "#64748b" }}>{b.author} • <span style={{ color: "#ea580c" }}>{b.category}</span></span>
                                </div>
                                <span style={{ color: '#0f172a', fontWeight: '900', fontSize: "18px" }}>{b.price} <span style={{ fontSize: "14px", color: "#94a3b8" }}>TL</span></span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Admin;