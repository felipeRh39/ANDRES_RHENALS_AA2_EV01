import { CalculoModel } from '../models/calculoModel.js';

/**
 * @function realizarDimensionamiento
 * @description Calcula la cantidad de paneles solares necesarios según el consumo mensual en kWh.
 * @route POST /api/calculo
 */
export const realizarDimensionamiento = async (req, res) => {
    try {
        const { cliente_nombre, consumo_kwh_mes, horas_sol_pico, potencia_panel_w } = req.body;

        // Validar requerimientos básicos
        if (!cliente_nombre || !consumo_kwh_mes || !horas_sol_pico || !potencia_panel_w) {
            return res.status(400).json({ mensaje: 'Todos los campos energéticos son obligatorios.' });
        }

        // 1. Cálculo de consumo diario promedio (kWh/día)
        const consumoDiarioKwh = consumo_kwh_mes / 30;

        // 2. Aplicación de factor de pérdida del sistema (aprox. 20% de pérdidas)
        const factorPerdida = 1.20;
        const energiaDiariaRequeridaWh = (consumoDiarioKwh * 1000) * factorPerdida;

        // 3. Generación diaria estimada por cada panel solar (Wh/día)
        const generacionPanelDiariaWh = potencia_panel_w * horas_sol_pico;

        // 4. Cálculo final del número de paneles (Redondeado hacia arriba)
        const panelesRequeridos = Math.ceil(energiaDiariaRequeridaWh / generacionPanelDiariaWh);

        // 5. Estimo de capacidad de batería requerida (Sistema en 24V con 50% de descarga)
        const bateriaAhRequerida = Math.ceil((energiaDiariaRequeridaWh / 24) * 2);

        const objetoResultado = {
            cliente_nombre,
            consumo_kwh_mes,
            horas_sol_pico,
            potencia_panel_w,
            paneles_requeridos: panelesRequeridos,
            bateria_ah_requerida: bateriaAhRequerida
        };

        // Guardar en la base de datos
        const idInsertado = await CalculoModel.guardarCalculo(objetoResultado);

        res.status(201).json({
            mensaje: 'Dimensionamiento realizado con éxito',
            id: idInsertado,
            resultado: objetoResultado
        });

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al procesar el dimensionamiento solar', error: error.message });
    }
};

/**
 * @function listarHistorialCalculos
 * @description Obtiene el historial completo de dimensionamientos.
 * @route GET /api/calculo
 */
export const listarHistorialCalculos = async (req, res) => {
    try {
        const historial = await CalculoModel.obtenerHistorial();
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el historial', error: error.message });
    }
};