let usuarioLogueado = null;

function setUsuario(usuario) {
    usuarioLogueado = usuario;
}

function getUsuario() {
    return usuarioLogueado;
}

function isAdmin(){

}

module.exports = {
    setUsuario,
    getUsuario
};