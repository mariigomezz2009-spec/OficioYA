const conexion = require("../config/database")



function login(data, callback) {
    const { email, password } = data;
    if (!email && !password) {
        return callback(new Error("datos incompletos"))
    } else {
        conexion.query(
            " SELECT * FROM usuarios WHERE email=?",
            [email],
            callback

        )
    }


}

function usuarioRegistro(data, callback) {
    const {email, password, telefono, nombre, apellido, } = data
    if (!email && !password && !telefono && !nombre && !apellido) {
        return callback(new Error("datos incompletos"))
    } else {
        conexion.query
        (
            "INSERT INTO usuarios (email, password, telefono, nombre, apellido) VALUES (?, ?, ?, ?, ?)",
            [email, password, telefono, nombre, apellido],
            callback
        )
    }
}

function profesionalRegistro(data, callback) {

}


module.exports = {
    login,
    usuarioRegistro,
    profesionalRegistro
}
