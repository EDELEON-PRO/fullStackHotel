import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
    const { user } = useAuth();
    console.log(user,'xxxx')
    return (
        <div>
            <h1>Admin Panel</h1>
            { user }
        </div>
    );
};

export default AdminPanel;