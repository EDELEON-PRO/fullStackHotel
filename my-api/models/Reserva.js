// models/Reserva.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const Habitacion = require('./Habitacion');


const Reserva = sequelize.define('Reserva', {
    fecha_inicio: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    fecha_fin: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    estado: {
        type: DataTypes.ENUM('activa', 'cancelada', 'pendiente', 'finalizada'),
        defaultValue: 'activa',
    },
    valor_pago: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    valor_reserva: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
});

// Relación con Usuario y Habitacion
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Habitacion, { foreignKey: 'habitacion_id' });

module.exports = Reserva;