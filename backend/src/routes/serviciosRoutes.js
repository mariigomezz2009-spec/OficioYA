const express = require('express');
const router = express.Router();

const{
    crearServicio,
    buscarServicios,
    obtenerServicioPorId,
    obtenerMisServicios,
    actualizarServicio,
    eliminarServicio
} = require("../controllers/serviciosController")

router.post('/crear-servicios', crearServicio);
router.get('/obtener-servicios', buscarServicios);
router.get('/mis-servicios', obtenerMisServicios);
router.get('/obtener-servicios/:id', obtenerServicioPorId);
router.put('/actualizar-servicios/:id', actualizarServicio);
router.delete('/borrar-servicios/:id', eliminarServicio);

module.exports = router;