const express = require('express');
const router = express.Router();
const { verificarToken, esProfesional } = require('../middlewares/auth');
const {
    buscarServicios,
    obtenerServicioPorId,
    crearServicio,
    actualizarServicio,
    eliminarServicio
} = require('../controllers/serviciosController');


router.get('/', buscarServicios);
router.get('/:id', obtenerServicioPorId);

router.post('/', verificarToken, esProfesional, crearServicio);
router.get('/mis-servicios/lista', verificarToken, obtenerMisServicios);
router.put('/:id', verificarToken, esProfesional, actualizarServicio);
router.delete('/:id', verificarToken, esProfesional, eliminarServicio);

module.exports = router;