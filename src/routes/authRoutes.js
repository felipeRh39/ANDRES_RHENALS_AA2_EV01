import { Router } from 'express';
import { registrar, login } from '../controllers/authController.js';

const router = Router();

// Endpoint para el registro de usuarios
router.post('/auth/registro', registrar);

// Endpoint para el inicio de sesión (Login)
router.post('/auth/login', login);

export default router;