// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login = ({ login }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const respuesta= await axios.post('http://localhost:3000/api/usuarios/login',
                {
                    "correo": email,
                    "clave": password
                  }
            );
            if(respuesta.status===200)
            {
                const token =respuesta.data.token;  
                const config= {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluye el token en los encabezados
                    }
                };
                const userData= await axios.get('http://localhost:3000/api/usuarios/me',
                    config
                );
                login(userData.data); // Actualiza el estado en App
                localStorage.setItem('token', token);
                localStorage.setItem("tipoUsuario",userData.data.tipo); // Almacena el tipo de usuario

                navigate('/dashboard'); // Redirige al dashboard

                
            }else{
                console.log('error login')
            }
            
        }
        catch(error){
            console.log(error);
        }

        
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" align="center" gutterBottom>
                Iniciar Sesión
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="standard"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" variant="contained" color="secondary" fullWidth>
                    Iniciar Sesión
                </Button>
            </form>
            <Grid container justifyContent="space-between" mt={2}>
                <Grid item>
                    <Button component="a" href="#" variant="text" color="primary">
                        ¿Olvidaste tu contraseña?
                    </Button>
                </Grid>
                <Grid item>
                    <Button component="a" href="#" variant="text" color="primary">
                        Registrarse
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
