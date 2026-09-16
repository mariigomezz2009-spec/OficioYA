const conexion = require("../config/database")

function login(req, res) {
    console.log("login bien hecho para testear en postman")
}

function register(req, res) {
    console.log("registro bien hecho para testear en postman")
}

module.exports = {
    login,
    register
}