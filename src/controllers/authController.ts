// src/controllers/authController.ts
import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
  async register(req: Request, res: Response) {
    const { nombre, email, password } = req.body;
    try {
      const usuario = await authService.register(nombre, email, password);
      res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
      
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { token, usuario } = await authService.login(email, password);
      res.status(200).json({ token, usuario });
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
      
  }
}
// Se fuerza el tipo ERROR usando un "type assertion" 
/*
 //Nota:
 En JavaScript, cuando ocurre un error dentro de un bloque try/catch, el valor capturado por catch (error) puede ser prácticamente cualquier cosa, no solo una instancia de Error. Aunque en la mayoría de los casos, los errores lanzados son instancias de Error, en algunas circunstancias puede que se lance otro tipo de valor.
 */
export default new AuthController();
