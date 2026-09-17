const authService = require('../services/authService');
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
function login(req, res) {
    const { email, password } = req.body
    authService.login({ email, password }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "error en la base de datos" })
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ error: "email no encontrado" })
        }
        const usuario = results[0];
        const hashAlmacenado = usuario.password
        if (!hashAlmacenado) {
            return res.status(500).json({ error: "usuario sin contraseña registrada" })
        }
        bcrypt.compare(password, hashAlmacenado, (err, coincide) => {
            if (err) {
                return res.status(500).json({ error: "error al verificar contraseña" })
            }
            if (coincide) {
                if (!process.env.JWT_SECRET) {
                    return res.status(500).json({ error: "JWT_SECRET no está configurado" });
                }

                const token = jwt.sign(
                    { id: usuario.id, email: usuario.email },
                    process.env.JWT_SECRET
                );
                auth.setUsuario(usuario);
                res.json({
                    mensaje: "Login exitoso",
                    token: token,
                    usuario: {
                        email: usuario.email,
                        id: usuario.id,
                    }
                })
            }else{
                 return res.status(401).json({ error: "contraseña incorrecta" })
            }

        })

    })
}

function usuarioRegistro(req, res) {
    const { email, password, telefono, nombre, apellido } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({ error: "Error al encriptar contraseña" });
        }
        authService.usuarioRegistro({ email, password: hash, telefono, nombre, apellido }, (err, results) => {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ mensaje: "Registro exitoso" });
        });
    });
}


function profesionalRegistro(req, res) {
    console.log("registro de profesional bien hecho para testear en postman")
}

module.exports = {
    login,
    usuarioRegistro,
    profesionalRegistro
}
