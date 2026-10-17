import { Router } from 'express';
import { 
    registrarPanel, 
    listarPaneles, 
    obtenerPanel, 
    actualizarPanel, 
    eliminarPanel 
} from '../controllers/panelController.js';

const router = Router();

router.post('/paneles', registrarPanel);         // CREATE
router.get('/paneles', listarPaneles);          // READ ALL
router.get('/paneles/:id', obtenerPanel);       // READ ONE
router.put('/paneles/:id', actualizarPanel);     // UPDATE
router.delete('/paneles/:id', eliminarPanel);   // DELETE

export default router;