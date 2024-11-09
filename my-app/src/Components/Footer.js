// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#3f51b5', // Cambia el color según tu tema
                color: 'white',
                textAlign: 'center',
                p: 2,
                position: 'relative',
                bottom: 0,
                width: '100%',
            }}
        >
            <Typography variant="body2">© 2024 Mi Aplicación</Typography>
        </Box>
    );
};

export default Footer;
