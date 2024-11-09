const  Hotel  = require('../models/Hotel');
const Usuario = require('../models/usuario');


// Crear un nuevo hotel (solo administrador)
exports.createHotel = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.userId, { attributes: { exclude: ['clave'] } });

        if (usuario.tipo !== 'administrador') return res.status(403).json(
            { message: 'Usuario no tiene privilegios para crear hoteles' }
            ); // Solo administradores pueden crear hoteles

        const { municipio_id,nombre, direccion, clasificacion, descripcion, imagen } = req.body;
        
        const hotel = await Hotel.create({
            municipio_id,
            nombre,
            direccion,
            clasificacion,
            descripcion,
            imagen,
            estado: 'A' // Activo por defecto
        });
        
        res.status(201).json({ message: 'Usuario registrado exitosamente',hotel });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los hoteles (para todos los usuarios)
exports.getAllHotels = async (req, res) => {
    try {
        const hoteles = await Hotel.findAll({where: {
                                                        estado:'A'
                                                    }
                                            });
        
        res.json(hoteles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los hoteles (para todos los usuarios)
exports.getHotel = async (req, res) => {
    try {
        const { id } = req.params;
        
        //findByPk(id);
        const hotel = await Hotel.findOne({
            where: {
                id: id, // Condición para el ID
                estado: 'A' // Condición para el estado
            }
        });
        
        
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }

        res.json(hotel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un hotel (solo administrador)
exports.updateHotel = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.userId, { attributes: { exclude: ['clave'] } });
        if (usuario.tipo !== 'administrador') return res.status(403).json(
            { message: 'Usuario no tiene privilegios para actualizar hoteles' }
            ); // Solo administradores pueden crear hoteles
        const { id } = req.params;
        
        await Hotel.update(req.body, { where: { id } });
        
        res.status(200).json({ message: 'Hotel actualizado exitosamente' });;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un hotel (solo administrador)
exports.deleteHotel = async (req, res) => {
    try {
        const { id } = req.params;
        
        await Hotel.update({ estado: 'D' }, { where: { id } }); // Cambia el estado a 'D' para eliminar lógicamente
        
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};