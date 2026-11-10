export const calcularDimensionamiento = (req, res) => {
    try {
        const { consumoMensual, porcentajeAhorro, redEstable } = req.body;

        if (!consumoMensual || !porcentajeAhorro) {
            return res.status(400).json({ error: "Debe ingresar el consumo mensual y el porcentaje de ahorro." });
        }

        const consumo = parseFloat(consumoMensual);
        const ahorro = parseFloat(porcentajeAhorro);

        // 1. kWh objetivo a generar al mes
        const kwhObjetivo = consumo * (ahorro / 100);

        // 2. Potencia requerida de la planta (kWp) - 5.0 HSP y 80% eficiencia
        const kwp = kwhObjetivo / (30 * 5.0 * 0.8);

        // 3. Cantidad de Paneles de 500 W (Redondeado al entero superior)
        const numeroPaneles = Math.ceil((kwp * 1000) / 500);

        // 4. Potencia del Inversor (+20% de seguridad)
        const potenciaInversorWatts = Math.ceil((kwp * 1000) * 1.2);

        // 5. Tipo de Sistema (On-Grid vs Off-Grid)
        let tipoConexion = "";
        let tipoInversor = "";
        let cantidadBaterias = 0;
        let capacidadBancoKwh = 0;

        if (redEstable) {
            tipoConexion = "On-Grid (Conectado a la Red Eléctrica)";
            tipoInversor = "Inversor On-Grid Centralizado / Microinversores";
        } else {
            tipoConexion = "Off-Grid (Aislado con Banco de Baterías)";
            tipoInversor = "Inversor Cargador Off-Grid";
            
            // Autonomía de 1.5 días
            capacidadBancoKwh = (kwhObjetivo / 30) * 1.5;
            // Baterías de 12V / 200Ah (2.4 kWh c/u)
            cantidadBaterias = Math.ceil(capacidadBancoKwh / 2.4);
        }

        return res.json({
            exito: true,
            resumen: {
                tipoConexion,
                paneles: {
                    cantidad: numeroPaneles,
                    potenciaIndividual: "500 W"
                },
                inversor: {
                    tipo: tipoInversor,
                    potenciaRecomendada: `${potenciaInversorWatts} W`
                },
                baterias: {
                    requiere: !redEstable,
                    cantidad: cantidadBaterias,
                    especificacion: !redEstable ? "12V 200Ah (2.4 kWh c/u)" : "N/A (No requiere)"
                }
            }
        });

    } catch (error) {
        return res.status(500).json({ error: "Error procesando el cálculo solar." });
    }
};