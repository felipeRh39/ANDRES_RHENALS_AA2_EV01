document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    const formRegistro = document.getElementById('formRegistro');
    const mensajeRespuesta = document.getElementById('mensajeRespuesta');

    function mostrarMensaje(texto, esExito) {
        mensajeRespuesta.textContent = texto;
        mensajeRespuesta.className = `mensaje ${esExito ? 'exito' : 'error'}`;
        mensajeRespuesta.style.display = 'block';
    }

    // Petición POST: Inicio de Sesión
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();

            const datos = {
                correo: document.getElementById('loginCorreo').value,
                password: document.getElementById('loginPassword').value
            };

            try {
                const respuesta = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    mostrarMensaje(`¡${resultado.mensaje}! Bienvenido(a) ${resultado.usuario.nombre}`, true);
                    formLogin.reset();
                } else {
                    mostrarMensaje(resultado.mensaje, false);
                }
            } catch (error) {
                mostrarMensaje('Error al conectar con el servidor', false);
            }
        });
    }

    // Petición POST: Registro de Usuario
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const datos = {
                nombre: document.getElementById('regNombre').value,
                correo: document.getElementById('regCorreo').value,
                password: document.getElementById('regPassword').value,
                rol: document.getElementById('regRol').value
            };

            try {
                const respuesta = await fetch('/api/auth/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                const resultado = await respuesta.json();

                if (respuesta.ok) {
                    mostrarMensaje(`${resultado.mensaje}. Ahora puedes iniciar sesión.`, true);
                    formRegistro.reset();
                    setTimeout(() => mostrarLogin(), 2000);
                } else {
                    mostrarMensaje(resultado.mensaje, false);
                }
            } catch (error) {
                mostrarMensaje('Error al procesar el registro', false);
            }
        });
    }
});