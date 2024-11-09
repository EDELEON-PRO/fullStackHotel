// src/components/Dashboard.js
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({ user, logout }) => {
    const navigate = useNavigate(); // Inicializa la función de navegación
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '40vh' }}>
                <Header />
                <p>
                    Rol: {user.tipo === 'administrador' ? 'Administrador' : 'Cliente'}</p>
            {user.tipo === 'administrador' ? (
                <div>
                      <button onClick={() => navigate('/hoteles')}>Gestionar Hoteles</button>
                      <button onClick={() => console.log('Gestionar Habitaciones')}>Gestionar Habitaciones</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => console.log('Reservar habitación')}>Reservar</button>
                    <button onClick={() => console.log('Mis reservas')}>Mis Reservas</button>
                    <button onClick={() => navigate('/')}>Cerrar sesion</button>
                </div>
            )}
                <Footer />
        </Box>
    );
};

export default Dashboard;
