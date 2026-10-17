import express from 'express';
import panelRoutes from './routes/panelRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar solicitudes con cuerpo JSON
app.use(express.json());

// Rutas de la API
app.use('/api', panelRoutes);

// Ruta principal de prueba
app.get('/', (req, res) => {
    res.send('Servidor de MiSolAR funcionando correctamente');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});