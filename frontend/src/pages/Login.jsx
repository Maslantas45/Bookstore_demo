import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('admin@admin.com');
    const [password, setPassword] = useState('123456');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            localStorage.setItem('adminToken', res.data.token);
            navigate('/admin');
        } catch (err) {
            alert("Giriş başarısız! Bilgileri kontrol et aga.");
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f3f4f6' }}>
            <form onSubmit={handleLogin} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', width: '320px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#ea580c' }}>Admin Girişi</h2>
                <input
                    type="email" value={email} onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
                />
                <input
                    type="password" value={password} onChange={e => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
                />
                <button type="submit" style={{ width: '100%', padding: '12px', backgroundColor: '#ea580c', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                    Giriş Yap
                </button>

                {/* YENİ EKLENEN ANA SAYFAYA DÖN BUTONU */}
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    style={{ width: '100%', padding: '12px', marginTop: '10px', backgroundColor: '#6b7280', color: 'white', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
                    ⬅ Müşteri Ekranına Dön
                </button>
            </form>
        </div>
    );
};

export default Login;