import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Laravel Sanctum veya JWT kullanıyorsan burası değişir ama şimdilik basit tutalım
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            if(response.status === 200) window.location.href = '/admin/dashboard';
        } catch (err) {
            alert("Giriş bilgileri hatalı!");
        }
    };

    return (
        <div className="login-container">
            <h2>Admin Girişi</h2>
            <form onSubmit={handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Şifre" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
};