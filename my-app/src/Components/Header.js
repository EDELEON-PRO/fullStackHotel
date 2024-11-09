// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
    return (
        <AppBar position="static" sx={{ zIndex: 1201 }}>
            <Toolbar>
                <Typography variant="h6" noWrap>
                    Mi Dashboard
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
