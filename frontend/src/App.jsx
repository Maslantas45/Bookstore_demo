import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreFront from './views/admin/default/index';
import Login from './pages/Login';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard'; // Yeni sayfa

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<StoreFront />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/preview" element={<AdminDashboard />} /> {/* Admin'in gizli demo yolu */}
            </Routes>
        </Router>
    );
}

export default App;