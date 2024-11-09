const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Habitacion = sequelize.define('Habitacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  hotel_id: { type: DataTypes.INTEGER, allowNull: false },
  numero_habitacion: { type: DataTypes.STRING, allowNull: false },
  tipo_habitacion: { type: DataTypes.ENUM('sencilla', 'doble'), defaultValue: 'sencilla' },
  capacidad: { type: DataTypes.INTEGER, allowNull: false },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  disponibilidad: { type: DataTypes.BOOLEAN, defaultValue: true }
}, { tableName: 'habitaciones', timestamps: false });

module.exports = Habitacion;
