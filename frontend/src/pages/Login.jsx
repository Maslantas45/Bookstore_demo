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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc', fontFamily: "'Segoe UI', Roboto, sans-serif" }}>
            <div style={{ backgroundColor: 'white', padding: '50px 40px', borderRadius: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', width: '100%', maxWidth: '400px' }}>

                {/* Logo ve Başlık */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "30px" }}>
                    <div style={{ width: "60px", height: "60px", backgroundColor: "#ea580c", borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center", color: "white", fontWeight: "900", fontSize: "36px", marginBottom: "15px", boxShadow: "0 10px 15px -3px rgba(234, 88, 12, 0.3)" }}>
                        K
                    </div>
                    <h2 style={{ margin: 0, color: '#0f172a', fontSize: "28px", fontWeight: "800" }}>Yönetici Girişi</h2>
                    <p style={{ margin: "5px 0 0 0", color: "#64748b" }}>KitapÜssü kontrol paneli</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", color: "#475569", fontWeight: "600", fontSize: "14px" }}>E-Posta Adresi</label>
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '14px', border: '2px solid #e2e8f0', borderRadius: '12px', boxSizing: 'border-box', outline: "none", fontSize: "16px", transition: "border 0.2s" }}
                            onFocus={(e) => e.target.style.borderColor = "#ea580c"}
                            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "8px", color: "#475569", fontWeight: "600", fontSize: "14px" }}>Şifre</label>
                        <input
                            type="password" value={password} onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '14px', border: '2px solid #e2e8f0', borderRadius: '12px', boxSizing: 'border-box', outline: "none", fontSize: "16px", transition: "border 0.2s" }}
                            onFocus={(e) => e.target.style.borderColor = "#ea580c"}
                            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
                        />
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '16px', marginTop: '10px', backgroundColor: '#ea580c', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: "16px", cursor: 'pointer', boxShadow: "0 4px 6px rgba(234, 88, 12, 0.2)", transition: "transform 0.1s" }}
                            onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
                            onMouseUp={(e) => e.target.style.transform = "scale(1)"}>
                        Giriş Yap
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        style={{ width: '100%', padding: '16px', marginTop: '5px', backgroundColor: '#f1f5f9', color: '#475569', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: "16px", cursor: 'pointer', transition: "background 0.2s" }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#e2e8f0"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#f1f5f9"}>
                        ⬅ Mağazaya Dön
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;