const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Hotel = sequelize.define('Hotel', {
    municipio_id: { type: DataTypes.STRING, allowNull: false },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    clasificacion: {
        type: DataTypes.DECIMAL(2, 1),
        defaultValue: 0.0,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
    imagen: {
        type: DataTypes.STRING,
    },
    estado: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: 'A', // A para activo, D para eliminado
    }
}, {
    tableName: 'hoteles',
    timestamps: false // Desactiva la creación automática de createdAt y updatedAt
  }
);

module.exports = Hotel;