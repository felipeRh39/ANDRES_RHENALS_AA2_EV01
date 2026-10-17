import { PanelModel } from '../models/panelModel.js';

export const registrarPanel = async (req, res) => {
    try {
        const { codigo_serie, marca, modelo, potencia_watts, eficiencia_porcentaje, precio_unitario, stock } = req.body;

        if (!codigo_serie || !marca || !modelo || !potencia_watts) {
            return res.status(400).json({ mensaje: 'Los campos serie, marca, modelo y potencia son obligatorios.' });
        }

        const idInsertado = await PanelModel.crear(req.body);
        res.status(201).json({ mensaje: 'Panel solar registrado exitosamente', id: idInsertado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar el panel solar', error: error.message });
    }
};

export const listarPaneles = async (req, res) => {
    try {
        const paneles = await PanelModel.obtenerTodos();
        res.status(200).json(paneles);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar el inventario', error: error.message });
    }
};

export const obtenerPanel = async (req, res) => {
    try {
        const { id } = req.params;
        const panel = await PanelModel.obtenerPorId(id);
        if (!panel) return res.status(404).json({ mensaje: 'Panel solar no encontrado' });
        
        res.status(200).json(panel);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el panel', error: error.message });
    }
};

export const actualizarPanel = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizado = await PanelModel.actualizar(id, req.body);
        if (!actualizado) return res.status(404).json({ mensaje: 'No se pudo actualizar el panel' });

        res.status(200).json({ mensaje: 'Panel solar actualizado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el panel', error: error.message });
    }
};

export const eliminarPanel = async (req, res) => {
    try {
        const { id } = req.params;
        const eliminado = await PanelModel.eliminar(id);
        if (!eliminado) return res.status(404).json({ mensaje: 'Panel solar no encontrado' });

        res.status(200).json({ mensaje: 'Panel solar eliminado del inventario' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el panel', error: error.message });
    }
};