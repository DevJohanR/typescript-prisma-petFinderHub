import express from 'express';
import userController from '../controllers/userController'; // Importa el controlador
import { verifyToken } from '../middleware/authMiddleware'; // Importa el middleware

const router = express.Router();

// Ruta simplificada para obtener un mensaje en la consola
router.get('/all-users', verifyToken, userController.getAllUsers.bind(userController));


export default router;
