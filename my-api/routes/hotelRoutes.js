const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotelController');
const authenticateToken = require('../middleware/authMiddleware');

// Crear un nuevo hotel (solo administrador)
router.post('/', authenticateToken, hotelController.createHotel);

// Obtener todos los hoteles (para todos los usuarios)
router.get('/', hotelController.getAllHotels);

// Obtener un  hoteles (para todos los usuarios)
router.get('/:id', hotelController.getHotel);

// Actualizar un hotel (solo administrador)
router.put('/:id', authenticateToken, hotelController.updateHotel);

// Eliminar un hotel (solo administrador)
router.delete('/:id', authenticateToken,hotelController.deleteHotel);

module.exports = router;