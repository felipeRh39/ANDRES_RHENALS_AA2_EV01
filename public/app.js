document.addEventListener('DOMContentLoaded', () => {
    const formPanel = document.getElementById('formPanel');
    const tablaPaneles = document.getElementById('tablaPaneles');

    // 1. Petición GET: Cargar inventario al abrir la página
    async function cargarInventario() {
        try {
            const respuesta = await fetch('/api/paneles');
            const paneles = await respuesta.json();

            tablaPaneles.innerHTML = '';
            paneles.forEach(panel => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${panel.codigo_serie}</td>
                    <td>${panel.marca} ${panel.modelo}</td>
                    <td>${panel.potencia_watts} W</td>
                    <td>$${panel.precio_unitario}</td>
                    <td>${panel.stock}</td>
                    <td>${panel.estado}</td>
                `;
                tablaPaneles.appendChild(fila);
            });
        } catch (error) {
            console.error('Error al cargar el inventario:', error);
        }
    }

    // 2. Petición POST: Registrar panel desde el formulario
    formPanel.addEventListener('submit', async (e) => {
        e.preventDefault();

        const datosPanel = {
            codigo_serie: document.getElementById('codigo_serie').value,
            marca: document.getElementById('marca').value,
            modelo: document.getElementById('modelo').value,
            potencia_watts: parseInt(document.getElementById('potencia_watts').value),
            eficiencia_porcentaje: parseFloat(document.getElementById('eficiencia_porcentaje').value),
            precio_unitario: parseFloat(document.getElementById('precio_unitario').value),
            stock: parseInt(document.getElementById('stock').value),
            estado: document.getElementById('estado').value
        };

        try {
            const respuesta = await fetch('/api/paneles', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosPanel)
            });

            if (respuesta.ok) {
                alert('¡Panel solar guardado exitosamente en la base de datos!');
                formPanel.reset();
                cargarInventario(); // Recargar la tabla dinámicamente
            } else {
                const error = await respuesta.json();
                alert(`Error: ${error.mensaje}`);
            }
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
        }
    });

    // Carga inicial
    cargarInventario();
});