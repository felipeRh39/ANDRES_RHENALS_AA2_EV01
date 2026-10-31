import { UsuarioModel } from '../models/usuarioModel.js';

/**
 * @function registrar
 * @description Registro de nuevos usuarios en el sistema MiSolAR.
 * @route POST /api/auth/registro
 */
export const registrar = async (req, res) => {
    try {
        const { nombre, correo, password, rol } = req.body;

        if (!nombre || !correo || !password) {
            return res.status(400).json({ mensaje: 'Nombre, correo y contraseña son obligatorios.' });
        }

        // Verificar si el usuario ya existe
        const usuarioExiste = await UsuarioModel.buscarPorCorreo(correo);
        if (usuarioExiste) {
            return res.status(400).json({ mensaje: 'El correo electrónico ya se encuentra registrado.' });
        }

        const idInsertado = await UsuarioModel.crearUsuario({ nombre, correo, password, rol });
        res.status(201).json({
            mensaje: 'Usuario registrado satisfactoriamente',
            usuarioId: idInsertado
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el usuario', error: error.message });
    }
};

/**
 * @function login
 * @description Autenticación de usuarios según los requerimientos del caso.
 * @route POST /api/auth/login
 */
export const login = async (req, res) => {
    try {
        const { correo, password } = req.body;

        if (!correo || !password) {
            return res.status(400).json({ mensaje: 'Debe proporcionar usuario (correo) y contraseña.' });
        }

        const usuario = await UsuarioModel.buscarPorCorreo(correo);

        // Validación de credenciales
        if (!usuario || usuario.password !== password) {
            return res.status(401).json({ mensaje: 'Error en la autenticación: Credenciales inválidas.' });
        }

        // Respuesta de autenticación satisfactoria exigida por la guía
        res.status(200).json({
            mensaje: 'Autenticación satisfactoria',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                correo: usuario.correo,
                rol: usuario.rol
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el proceso de autenticación', error: error.message });
    }
};