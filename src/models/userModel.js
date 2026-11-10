import pool from '../config/db.js';

export const User = {
    // Buscar usuario por correo para el Login
    findByEmail: async (email) => {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        return rows[0];
    },

    // Registrar un nuevo usuario en MySQL
    create: async (nombre, email, password) => {
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        return result.insertId;
    }
};