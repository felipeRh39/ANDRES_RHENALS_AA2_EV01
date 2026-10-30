import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import panelRoutes from './routes/panelRoutes.js';
import calculoRoutes from './routes/calculoRoutes.js'; //nuevo modulo de dimencionamiento

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para procesar formularios HTML

// Servir la interfaz de usuario estática desde la carpeta "public"
app.use(express.static(path.join(__dirname, '../public')));

// Rutas de la API
app.use('/api', panelRoutes);

// Rutas de la API de MiSolAR
app.use('/api', panelRoutes);
app.use('/api', calculoRoutes); // Nuevo módulo de dimensionamiento

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor de MiSolAR corriendo en http://localhost:${PORT}`);
});