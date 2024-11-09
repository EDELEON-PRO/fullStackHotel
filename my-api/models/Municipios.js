const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const Municipio = sequelize.define('Municipio', {
    id: { type: DataTypes.STRING, primaryKey: true },
    
    departamento_id: { // Clave foránea para el departamento
        type: DataTypes.INTEGER,
        references: {
            model: 'Departamento', // Nombre de la tabla referenciada
            key: 'id'
        }
    },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'municipios',
  timestamps: false // Desactiva la creación automática de createdAt y updatedAt
});


    
module.exports = Municipio;
