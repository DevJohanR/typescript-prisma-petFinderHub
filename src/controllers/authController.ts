import { Request, Response } from 'express';
import authService from '../services/authService';
import { prisma } from '../db';

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

       // Nueva ruta para manejar la verificación del correo
    async verifyEmail(req: Request, res: Response): Promise<Response> {
        try {
            const { token } = req.query;

            // Buscar el token en la base de datos
            const verificationToken = await prisma.verificationToken.findUnique({
                where: { token: token as string },
            });

            if (!verificationToken) {
                return res.status(400).json({ message: 'Token inválido o expirado' });
            }

            // Actualizar el usuario para marcarlo como verificado
            await prisma.usuario.update({
                where: { id: verificationToken.userId },
                data: { esVerificado: true }, // Ahora `esVerificado` debería estar presente en tu esquema
            });

            // Eliminar el token de verificación de la base de datos
            await prisma.verificationToken.delete({
                where: { token: token as string },
            });

            return res.status(200).json({ message: 'Correo electrónico verificado con éxito' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al verificar el correo electrónico' });
        }
    }
}

export default new AuthController();
