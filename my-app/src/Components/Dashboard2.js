// src/components/Dashboard.js
import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
    return (
        <Box display="flex">
            <Sidebar />
            <Box flexGrow={1}>
                <Header />
                <Box p={2}>
                    <h2>Bienvenido al Dashboard</h2>
                    {/* Aquí iría el contenido del dashboard */}
                </Box>
                <Footer />
            </Box>
        </Box>
    );
};

export default Dashboard;
