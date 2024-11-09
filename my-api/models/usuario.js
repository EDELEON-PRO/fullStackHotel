const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Importa tu conexión de Sequelize

const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clave: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('cliente', 'administrador'),
    defaultValue: 'cliente'
  }
}, {
  tableName: 'usuarios',
  timestamps: false // Desactiva la creación automática de createdAt y updatedAt
});

module.exports = Usuario;
