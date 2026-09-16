const authService = require('../services/authService');

function login(req, res) {
    console.log("login bien hecho para testear en postman")
}

function usuarioRegistro(req, res) {
    console.log("registro bien hecho para testear en postman")
}


function profesionalRegistro(req, res) {
    console.log("registro bien hecho para testear en postman")
}

module.exports = {
    login,
    usuarioRegistro,
    profesionalRegistro
}