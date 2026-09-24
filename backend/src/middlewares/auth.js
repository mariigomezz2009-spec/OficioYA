
const jwt = require('jsonwebtoken');
const conexion = require('../config/database'); // Tu conexión a MySQL

let usuarioLogueado = null;

function setUsuario(usuario) {
    usuarioLogueado = usuario;
}

function getUsuario() {
    return usuarioLogueado;
}

// Middleware 1: Verificar Token JWT
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'secreto_super_seguro', (err, usuario) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token inválido o expirado' });
        }
        req.usuario = usuario; // Guarda los datos del payload (id, email, rol, etc.)
        next();
    });
};

// Middleware 2: Verificar si el usuario es Profesional y obtener su profesional_id
const esProfesional = (req, res, next) => {
    if (req.usuario.rol !== 'profesional') {
        return res.status(403).json({ mensaje: 'Acceso restringido solo para profesionales' });
    }

    // Buscamos el id de la tabla 'profesionales' que corresponde al user_id del token
    const sql = 'SELECT id FROM profesionales WHERE user_id = ?';

    conexion.query(sql, [req.usuario.id], (err, rows) => {
        if (err) {
            return res.status(500).json({ mensaje: 'Error interno del servidor al validar rol' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Perfil profesional no encontrado' });
        }

        // Guardamos el id del profesional para usarlo directamente en los controladores
        req.profesional_id = rows[0].id;
        next();
    });
};


module.exports = {
    setUsuario,
    getUsuario,
    verificarToken,
    esProfesional
};