const  Municipio  = require('../models/Municipios');
const  Departamento  = require('../models/Departamento');
// Obtener todos los hoteles (para todos los usuarios)
exports.getAllTown = async (req, res) => {
    try {
        const municipios = await Municipio.findAll(
            {
                include: [{
                    model: Departamento,
                    as: 'departamento',
                    attributes: ['nombre'], // Solo traer el nombre del departamento
                    where:{pais_id:57}
                }],
                attributes: ['id', 'nombre'] // Solo traer los campos necesarios de municipio
            }

        );
        
        res.json(municipios);
    } catch (error) {
        res.status(500).json({ message: error.message +'aa' });
    }
};

// Obtener todos los hoteles (para todos los usuarios)
exports.getTown = async (req, res) => {
    try {
        const { id } = req.params;
        
        //findByPk(id);
        const municipio = await Municipio.findByPk(id);
        
        
        if (!municipio) {
            return res.status(404).json({ message: 'municipio no encontrado' });
        }

        res.json(municipio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

