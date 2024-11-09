// config/database.js
const { Sequelize } = require('sequelize');

// Configuración de conexión a la base de datos
const sequelize = new Sequelize('hotel', 'root', 'mysql2024', {
  host: '127.0.0.1', // Cambia el host si tu servidor de base de datos está en otro lado
  dialect: 'mysql',
  logging: true, // Desactiva el log de consultas si prefieres que no se vean en la consola
});

module.exports = sequelize;
