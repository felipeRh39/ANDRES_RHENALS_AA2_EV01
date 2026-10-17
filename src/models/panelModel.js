import db from '../config/db.js';

export const PanelModel = {
    // 1. CREATE - Registrar un nuevo panel
    async crear(datosPanel) {
        const sql = `
            INSERT INTO paneles_solares 
            (codigo_serie, marca, modelo, potencia_watts, eficiencia_porcentaje, precio_unitario, stock, estado) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const valores = [
            datosPanel.codigo_serie,
            datosPanel.marca,
            datosPanel.modelo,
            datosPanel.potencia_watts,
            datosPanel.eficiencia_porcentaje,
            datosPanel.precio_unitario,
            datosPanel.stock,
            datosPanel.estado || 'Disponible'
        ];
        const [resultado] = await db.execute(sql, valores);
        return resultado.insertId;
    },

    // 2. READ - Obtener todos los paneles
    async obtenerTodos() {
        const sql = 'SELECT * FROM paneles_solares ORDER BY creado_en DESC';
        const [filas] = await db.execute(sql);
        return filas;
    },

    // READ - Obtener por ID
    async obtenerPorId(id) {
        const sql = 'SELECT * FROM paneles_solares WHERE id = ?';
        const [filas] = await db.execute(sql, [id]);
        return filas[0];
    },

    // 3. UPDATE - Actualizar datos de un panel
    async actualizar(id, datosPanel) {
        const sql = `
            UPDATE paneles_solares 
            SET marca = ?, modelo = ?, potencia_watts = ?, eficiencia_porcentaje = ?, precio_unitario = ?, stock = ?, estado = ?
            WHERE id = ?
        `;
        const valores = [
            datosPanel.marca,
            datosPanel.modelo,
            datosPanel.potencia_watts,
            datosPanel.eficiencia_porcentaje,
            datosPanel.precio_unitario,
            datosPanel.stock,
            datosPanel.estado,
            id
        ];
        const [resultado] = await db.execute(sql, valores);
        return resultado.affectedRows > 0;
    },

    // 4. DELETE - Eliminar un panel del inventario
    async eliminar(id) {
        const sql = 'DELETE FROM paneles_solares WHERE id = ?';
        const [resultado] = await db.execute(sql, [id]);
        return resultado.affectedRows > 0;
    }
};