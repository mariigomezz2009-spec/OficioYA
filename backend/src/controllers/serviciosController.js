const serviciosService = require('../services/serviciosService');

// 1. Crear un nuevo servicio
const crearServicio = (req, res) => {
  const { categoria_id, titulo, descripcion, precio } = req.body;

  // Validaciones de campos requeridos
  if (!categoria_id || !titulo) {
    return res.status(400).json({ mensaje: 'La categoría y el título son obligatorios' });
  }

  const datosServicio = {
    profesional_id: req.profesional_id, // Viene del middleware esProfesional
    categoria_id,
    titulo,
    descripcion,
    precio
  };

  serviciosService.crearServicio(datosServicio, (err, nuevoServicio) => {
    if (err) {
      console.error('Error al crear servicio:', err);
      return res.status(500).json({ mensaje: 'Error al registrar el servicio' });
    }
    return res.status(201).json({
      mensaje: 'Servicio creado exitosamente',
      datos: nuevoServicio
    });
  });
};

// 2. Buscar/Listar todos los servicios activos (público)
const buscarServicios = (req, res) => {
  const filtros = {
    categoria_id: req.query.categoria_id,
    zona: req.query.zona
  };

  serviciosService.buscarServicios(filtros, (err, servicios) => {
    if (err) {
      console.error('Error al buscar servicios:', err);
      return res.status(500).json({ mensaje: 'Error al obtener los servicios' });
    }
    return res.status(200).json(servicios);
  });
};

// 3. Obtener detalle de un servicio por ID (público)
const obtenerServicioPorId = (req, res) => {
  const servicioId = req.params.id;

  serviciosService.obtenerServicioPorId(servicioId, (err, servicio) => {
    if (err) {
      console.error('Error al obtener servicio:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    if (!servicio) {
      return res.status(404).json({ mensaje: 'Servicio no encontrado' });
    }

    return res.status(200).json(servicio);
  });
};

// 4. Listar servicios creados por el profesional autenticado
const obtenerMisServicios = (req, res) => {
  const profesionalId = req.profesional_id; // Viene del middleware esProfesional

  serviciosService.obtenerServiciosPorProfesional(profesionalId, (err, servicios) => {
    if (err) {
      console.error('Error al obtener mis servicios:', err);
      return res.status(500).json({ mensaje: 'Error al consultar sus servicios' });
    }
    return res.status(200).json(servicios);
  });
};

// 5. Actualizar un servicio
const actualizarServicio = (req, res) => {
  const servicioId = req.params.id;
  const profesionalId = req.profesional_id;
  const { categoria_id, titulo, descripcion, precio } = req.body;

  if (!categoria_id || !titulo) {
    return res.status(400).json({ mensaje: 'La categoría y el título son obligatorios' });
  }

  const datos = { categoria_id, titulo, descripcion, precio };

  serviciosService.actualizarServicio(servicioId, profesionalId, datos, (err, actualizado) => {
    if (err) {
      console.error('Error al actualizar servicio:', err);
      return res.status(500).json({ mensaje: 'Error al modificar el servicio' });
    }

    if (!actualizado) {
      return res.status(404).json({ 
        mensaje: 'Servicio no encontrado o no tiene permisos para editarlo' 
      });
    }

    return res.status(200).json({ mensaje: 'Servicio actualizado correctamente' });
  });
};

// 6. Eliminar un servicio (Baja lógica)
const eliminarServicio = (req, res) => {
  const servicioId = req.params.id;
  const profesionalId = req.profesional_id;

  serviciosService.eliminarServicio(servicioId, profesionalId, (err, eliminado) => {
    if (err) {
      console.error('Error al eliminar servicio:', err);
      return res.status(500).json({ mensaje: 'Error al eliminar el servicio' });
    }

    if (!eliminado) {
      return res.status(404).json({ 
        mensaje: 'Servicio no encontrado o no tiene permisos para eliminarlo' 
      });
    }

    return res.status(200).json({ mensaje: 'Servicio eliminado correctamente' });
  });
};

module.exports = {
  crearServicio,
  buscarServicios,
  obtenerServicioPorId,
  obtenerMisServicios,
  actualizarServicio,
  eliminarServicio
};