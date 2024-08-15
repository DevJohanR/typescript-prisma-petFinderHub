import { Request, Response } from 'express';

class UserController {
    // Método simplificado para manejar la ruta
    getAllUsers(_req: Request, res: Response): void {
        console.log('Hola, aquí irían los usuarios');
        res.status(200).send('Usuarios obtenidos correctamente');
    }

    // Otros métodos relacionados con usuarios pueden ir aquí en el futuro...
}

export default new UserController();
