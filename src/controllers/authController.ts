import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
    async register(req: Request, res: Response): Promise<Response> {
        try {
            const { nombre, email, password } = req.body;
            const usuario = await authService.register(nombre, email, password);
            return res.status(201).json(usuario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
            const usuario = await authService.login(email, password);

            if (!usuario) {
                return res.status(401).json({ message: 'Credenciales incorrectas' });
            }

            return res.status(200).json(usuario);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }
    }
}

export default new AuthController();
