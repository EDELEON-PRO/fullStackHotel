// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Drawer } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Sidebar = () => {
    return (
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0 }}>
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
