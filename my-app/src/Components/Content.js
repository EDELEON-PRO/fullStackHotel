// src/components/Content.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Content = () => {
    const { user, logout } = useAuth();
    console.log(user)
    return (
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Bienvenido al Dashboard {user}
            </Typography>
            <div>
            <h2>Bienvenido, {user?.tipo === 'administrador' ? 'Administrador' : 'Cliente'}</h2>
            {user?.tipo === 'administrador' ? (
                <div>
                    <button onClick={() => console.log('Gestión de hoteles')}>Gestionar Hoteles</button>
                    <button onClick={() => console.log('Gestión de habitaciones')}>Gestionar Habitaciones</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => console.log('Reservar habitación')}>Reservar</button>
                    <button onClick={() => console.log('Mis reservas')}>Mis Reservas</button>
                </div>
            )}
            <button onClick={logout}>Cerrar Sesión</button>
        </div>
        </Box>
    );
};

export default Content;
