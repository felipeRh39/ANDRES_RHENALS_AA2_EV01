import { Router } from 'express';
import { realizarDimensionamiento, listarHistorialCalculos } from '../controllers/calculoController.js';

const router = Router();

// Ruta para ejecutar y guardar un dimensionamiento solar
router.post('/calculo', realizarDimensionamiento);

// Ruta para obtener el historial de dimensionamientos
router.get('/calculo', listarHistorialCalculos);

export default router;