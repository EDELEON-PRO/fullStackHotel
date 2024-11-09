// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const reservaRoutes = require('./routes/reservasRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const municipioRoutes = require('./routes/municipioRoutes');

app.use(cors());
app.use(express.json());

// Sincronizar la base de datos
sequelize.sync();

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/hoteles', hotelRoutes);
app.use('/api/municipios', municipioRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
