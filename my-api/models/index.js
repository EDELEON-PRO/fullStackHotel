'use strict';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//const sequelize = require('../config/db.config');
const Usuario = require('./usuario');
const Habitacion = require('./Habitacion');
const Hotel = require('./Hotel');
const Municipio = require('./Municipios');
const Departamento =require('./Departamento');

// Definir las asociaciones
Departamento.hasMany(Municipio, {
  foreignKey: 'departamento_id', // Clave foránea en el modelo Municipio
  sourceKey: 'id' // Clave primaria en el modelo Departamento
  ,as: 'municipios' // Define un alias para la asociación
});

Municipio.belongsTo(Departamento, {
  foreignKey: 'departamento_id', // Clave foránea en el modelo Municipio
  targetKey: 'id' // Clave primaria en el modelo Departamento
  ,as: 'departamento' // Define un alias para la asociación

});
// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => console.log("Modelos sincronizados"))
  .catch(err => console.error("Error al sincronizar modelos:", err));

module.exports = { Usuario, Hotel, Habitacion,Municipio,Departamento };
