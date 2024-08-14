import { Request, Response } from 'express';
import authService from '../services/authService';

/*
Responsabilidad: Los controladores manejan las peticiones HTTP (como POST, GET, etc.) y son responsables de decidir qué hacer con la solicitud. Reciben los datos del cliente, validan la entrada (en algunos casos), llaman a los servicios para realizar las operaciones de negocio, y finalmente envían una respuesta al cliente.

Ejemplo: Aqui, el controlador de autenticación (authController.ts) maneja las rutas de registro y login. Recibe las solicitudes, las procesa (por ejemplo, extrae los datos del cuerpo de la solicitud), llama a los métodos del servicio correspondiente, y luego devuelve la respuesta al cliente.
*/


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
