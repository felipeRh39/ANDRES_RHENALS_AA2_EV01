import db from '../config/db.js';

/**
 * @module CalculoModel
 * @description Modelo encargado de la interacción con la base de datos para los proyectos de dimensionamiento solar.
 */
export const CalculoModel = {
    /**
     * Guarda un nuevo cálculo de dimensionamiento solar en la base de datos.
     * @param {Object} datosProyecto - Objeto con los parámetros energéticos calculados.
     * @returns {Promise<number>} ID del registro insertado.
     */
    async guardarCalculo(datosProyecto) {
        const sql = `
            INSERT INTO dimensionamientos 
            (cliente_nombre, consumo_kwh_mes, horas_sol_pico, potencia_panel_w, paneles_requeridos, bateria_ah_requerida) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            datosProyecto.cliente_nombre,
            datosProyecto.consumo_kwh_mes,
            datosProyecto.horas_sol_pico,
            datosProyecto.potencia_panel_w,
            datosProyecto.paneles_requeridos,
            datosProyecto.bateria_ah_requerida
        ];
        const [resultado] = await db.execute(sql, valores);
        return resultado.insertId;
    },

    /**
     * Obtiene el historial de todos los dimensionamientos realizados.
     * @returns {Promise<Array>} Lista de registros de dimensionamientos.
     */
    async obtenerHistorial() {
        const sql = 'SELECT * FROM dimensionamientos ORDER BY creado_en DESC';
        const [filas] = await db.execute(sql);
        return filas;
    }
};