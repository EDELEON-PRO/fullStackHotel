// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', usuarioController.register);
router.post('/login', usuarioController.login);
router.get('/me', authMiddleware, usuarioController.getUsuario);

module.exports = router;
