import db from '../config/db.js';

/**
 * @module UsuarioModel
 * @description Modelo encargado de la interacción con la base de datos para la gestión de usuarios.
 */
export const UsuarioModel = {
    /**
     * Inserta un nuevo usuario en la base de datos.
     * @param {Object} datosUsuario - Datos del nuevo usuario (nombre, correo, password, rol).
     * @returns {Promise<number>} ID del usuario creado.
     */
    async crearUsuario(datosUsuario) {
        const sql = 'INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)';
        const valores = [
            datosUsuario.nombre,
            datosUsuario.correo,
            datosUsuario.password,
            datosUsuario.rol || 'Tecnico'
        ];
        const [resultado] = await db.execute(sql, valores);
        return resultado.insertId;
    },

    /**
     * Busca un usuario por su correo electrónico para validar credenciales.
     * @param {string} correo - Correo del usuario.
     * @returns {Promise<Object|null>} Objeto del usuario o undefined si no existe.
     */
    async buscarPorCorreo(correo) {
        const sql = 'SELECT * FROM usuarios WHERE correo = ?';
        const [filas] = await db.execute(sql, [correo]);
        return filas[0];
    }
};