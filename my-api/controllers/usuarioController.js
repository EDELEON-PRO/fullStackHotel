// controllers/usuarioController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// Registro de usuario
exports.register = async (req, res) => {
  const { nombre, correo, clave, telefono, direccion, tipo } = req.body;
  try {
    const hashedClave = await bcrypt.hash(clave, 10);
    const usuario = await Usuario.create({
      nombre,
      correo,
      clave: hashedClave,
      telefono,
      direccion,
      tipo
    });
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario ' + error });
  }
};

// Login de usuario
exports.login = async (req, res) => {
  const { correo, clave } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario || !(await bcrypt.compare(clave, usuario.clave))) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }
    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

// Obtener datos del usuario
exports.getUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.userId, { attributes: { exclude: ['clave'] } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};
