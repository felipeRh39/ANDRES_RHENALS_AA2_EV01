document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('formLogin');
    const formRegistro = document.getElementById('formRegistro');

    // 1. EVENTO INICIO DE SESIÓN (LOGIN)
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const correo = document.getElementById('loginCorreo').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ correo, password })
                });

                const data = await res.json();
                if (res.ok) {
                    localStorage.setItem('usuarioMiSolar', JSON.stringify(data.usuario));
                    mostrarAlerta('¡Autenticación satisfactoria! Redirigiendo...', true);
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1500);
                } else {
                    mostrarAlerta(data.mensaje, false);
                }
            } catch (err) {
                mostrarAlerta('Error de conexión con el servidor', false);
            }
        });
    }

    // 2. EVENTO REGISTRO DE USUARIO
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nombre = document.getElementById('regNombre').value;
            const correo = document.getElementById('regCorreo').value;
            const password = document.getElementById('regPassword').value;
            const rolElem = document.getElementById('regRol');
            const rol = rolElem ? rolElem.value : 'Tecnico';

            try {
                const res = await fetch('/api/auth/registro', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nombre, correo, password, rol })
                });

                const data = await res.json();
                if (res.ok) {
                    mostrarAlerta('¡Registro exitoso! Redirigiendo al inicio de sesión...', true);
                    formRegistro.reset();
                    setTimeout(() => {
                        toggleViews();
                    }, 1800);
                } else {
                    mostrarAlerta(data.mensaje, false);
                }
            } catch (err) {
                mostrarAlerta('Error en el proceso de registro', false);
            }
        });
    }
});

function toggleViews() {
    const boxLogin = document.getElementById('boxLogin');
    const boxRegistro = document.getElementById('boxRegistro');
    const alertBox = document.getElementById('alertBox');
    
    if (alertBox) alertBox.style.display = 'none';

    if (boxLogin.style.display === 'none') {
        boxLogin.style.display = 'block';
        boxRegistro.style.display = 'none';
    } else {
        boxLogin.style.display = 'none';
        boxRegistro.style.display = 'block';
    }
}

function mostrarAlerta(msg, esExito) {
    const alertBox = document.getElementById('alertBox');
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.className = `alert ${esExito ? 'alert-success' : 'alert-error'}`;
    alertBox.style.display = 'block';
}