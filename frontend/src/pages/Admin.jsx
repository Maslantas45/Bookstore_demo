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
            alert("Kitap eklendi!");
            fetchBooks();
            setFormData({ title: '', author: '', category: 'Roman', price: '', image_url: '' });
        } catch (err) {
            alert("Hata! Kitap eklenemedi.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/login');
    };

    return (
        <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ color: '#1f2937' }}>Gizli Admin Paneli</h1>

                {/* SAĞ ÜSTTEKİ YENİ BUTONLARIMIZ */}
                <div>
                    <button onClick={() => navigate('/admin/preview')} style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Demoyu Görüntüle (Reset Paneli) ➡
                    </button>
                    <button onClick={handleLogout} style={{ padding: '10px 20px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Çıkış Yap
                    </button>
                </div>
            </div>

            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
                <h3 style={{ marginTop: 0, color: '#ea580c' }}>Yeni Kitap Ekle</h3>
                <form onSubmit={handleAddBook} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                    <input placeholder="Kitap Adı" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ flex: 1, minWidth: '200px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                    <input placeholder="Yazar" required value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} style={{ flex: 1, minWidth: '150px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                    <input placeholder="Kategori" required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '120px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                    <input placeholder="Fiyat" type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                    <input placeholder="Görsel URL (İsteğe Bağlı)" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} style={{ flex: 1, minWidth: '200px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }} />
                    <button type="submit" style={{ padding: '10px 25px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                        Kaydet
                    </button>
                </form>
            </div>

            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <h3 style={{ marginTop: 0 }}>Sistemdeki Kitaplar</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {books.map(b => (
                        <li key={b.id} style={{ padding: '12px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                            <span><strong>{b.title}</strong> - {b.author} ({b.category})</span>
                            <span style={{ color: '#ea580c', fontWeight: 'bold' }}>{b.price} TL</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;