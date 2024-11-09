// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Hoteles from './Components/Hotel.js';
import PrivateRoute from './Components/PrivateRoute';

function App() {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login login={login} />} />
                <Route path="/dashboard" element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/" />} />
            
                    {/* Ruta privada para Hoteles solo para administradores */}
        <Route 
          path="/hoteles" 
          element={   
            <PrivateRoute requiredRole="administrador">
            <Hoteles />
            </PrivateRoute>
          } 
        />
        <Route path="/acceso-denegado" element={<div>Acceso denegado</div>} />
            </Routes>
        </Router>
    );
}

export default App;
