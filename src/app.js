import express from 'express';
import dotenv from 'dotenv';
import { registrar, login } from './controllers/authController.js';
import { calcularDimensionamiento } from './controllers/calculoController.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Rutas de Autenticación
app.post('/api/auth/registro', registrar);
app.post('/api/auth/login', login);

// Ruta de Cálculo Solar
app.post('/api/calcular', calcularDimensionamiento);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de MiSolAR corriendo en http://localhost:${PORT}`);
});