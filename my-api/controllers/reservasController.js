// controllers/reservaController.js
const { Reserva } = require('../models');
const { Usuario } = require('../models');
const { Habitacion } = require('../models');

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  try {
    const { habitacion_id, fecha_inicio, fecha_fin, valor_pago, valor_reserva } = req.body;
    const usuario_id = req.user.id; // Obtenemos el id del usuario autenticado

    const reserva = await Reserva.create({
      usuario_id,
      habitacion_id,
      fecha_inicio,
      fecha_fin,
      valor_pago,
      valor_reserva,
    });

    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

// Obtener reservas del usuario logueado
exports.getReservasUsuario = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      where: { usuario_id: req.user.id },
      include: [{ model: Habitacion }]
    });
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

// Actualizar una reserva
exports.updateReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha_inicio, fecha_fin, estado, valor_pago, valor_reserva } = req.body;

    const reserva = await Reserva.findOne({ where: { id, usuario_id: req.user.id } });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

    reserva.fecha_inicio = fecha_inicio;
    reserva.fecha_fin = fecha_fin;
    reserva.estado = estado;
    reserva.valor_pago = valor_pago;
    reserva.valor_reserva = valor_reserva;

    await reserva.save();
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

// Eliminar una reserva
exports.deleteReserva = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await Reserva.findOne({ where: { id, usuario_id: req.user.id } });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });

    await reserva.destroy();
    res.status(200).json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};
