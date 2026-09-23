const conexion = require("../config/database");

function login(data, callback) {
    const { email, password } = data;
    if (!email && !password) {
        return callback(new Error("datos incompletos"));
    } else {
        conexion.query(
            "SELECT * FROM usuarios WHERE email=?",
            [email],
            callback
        );
    }
}

function usuarioRegistro(data, callback) {
    const { email, password, telefono, nombre, apellido } = data;
    if (!email || !password || !telefono || !nombre || !apellido) {
        return callback(new Error("datos incompletos"));
    } else {
        conexion.query(
            "INSERT INTO usuarios (email, password, telefono, nombre, apellido) VALUES (?, ?, ?, ?, ?)",
            [email, password, telefono, nombre, apellido],
            callback
        );
    }
}

const profesionalRegistro = async (data) => {
    const {
        nombre,
        apellido,
        telefono,
        email,
        password,
        biografia,
        zona,
        disponibilidad,
        documento_url
    } = data;

    if (!nombre || !apellido || !email || !password) {
        throw new Error("Datos incompletos");
    }

    const connection = conexion.promise();

    try {
        await connection.beginTransaction();

        const sqlUsuario = `
            INSERT INTO usuarios (nombre, apellido, telefono, email, password, rol)
            VALUES (?, ?, ?, ?, ?, 'profesional')
        `;

        const [resultUsuario] = await connection.query(sqlUsuario, [
            nombre,
            apellido,
            telefono,
            email,
            password
        ]);

        const userId = resultUsuario.insertId;

        const sqlProfesional = `
            INSERT INTO profesionales (user_id, biografia, zona, disponibilidad, documento_url)
            VALUES (?, ?, ?, ?, ?)
        `;

        await connection.query(sqlProfesional, [
            userId,
            biografia || null,
            zona || null,
            disponibilidad || null,
            documento_url || null
        ]);

        await connection.commit();

        return { id: userId, email, rol: "profesional" };
    } catch (error) {
        await connection.rollback();
        throw error;
    }
};

module.exports = {
    login,
    usuarioRegistro,
    profesionalRegistro
};
