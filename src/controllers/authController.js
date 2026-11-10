import { User } from '../models/userModel.js';

export const registrar = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const usuarioExistente = await User.findByEmail(email);
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        const nuevoId = await User.create(nombre, email, password);
        return res.status(201).json({ exito: true, mensaje: 'Usuario registrado con éxito.', userId: nuevoId });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al registrar el usuario en la base de datos.' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Ingrese correo y contraseña.' });
        }

        const usuario = await User.findByEmail(email);
        if (!usuario || usuario.password !== password) { // Para producción se recomienda encriptar con bcrypt
            return res.status(401).json({ error: 'Credenciales incorrectas.' });
        }

        return res.json({
            exito: true,
            mensaje: 'Inicio de sesión exitoso.',
            usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
};