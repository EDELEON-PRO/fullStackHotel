// routes/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservasController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas protegidas
router.post('/crear', authMiddleware, reservaController.createReserva);
router.get('/mis-reservas', authMiddleware, reservaController.getReservasUsuario);
router.put('/actualizar/:id', authMiddleware, reservaController.updateReserva);
router.delete('/eliminar/:id', authMiddleware, reservaController.deleteReserva);

module.exports = router;
