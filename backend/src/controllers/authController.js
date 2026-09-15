const conexion = require("../config/database")

function login(req, res) {
console.log(conexion)
}

function register(req, res) {
console.log(conexion)
}

module.exports = {
    login,
    register
}