// src/services/authService.ts
import Usuario from '../models/Usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'tu_clave_secreta';

class AuthService {
    async register(nombre: string, email: string, password: string) {
      const usuario = new Usuario(nombre, email, password);
      return usuario.save();
    }
  
    async login(email: string, password: string) {
      const usuario = await Usuario.findByEmail(email);
      if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        throw new Error('Credenciales inválidas');
      }
  
      const token = jwt.sign({ userId: usuario.id }, JWT_SECRET, { expiresIn: '1h' });
      return { token, usuario };
    }
  }
  
  export default new AuthService();