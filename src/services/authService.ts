import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

/*
Responsabilidad: Los servicios encapsulan la lógica de negocio, es decir, todo el procesamiento real de los datos. Esto puede incluir operaciones con la base de datos, validaciones complejas, llamadas a APIs externas, etc. Al mantener esta lógica separada, el controlador se mantiene limpio y enfocado solo en manejar solicitudes HTTP.

Ejemplo: El servicio de autenticación (authService.ts) se encarga de registrar usuarios, comprobar sus credenciales durante el login, etc. De esta manera, si decidimos cambiar la forma en que registramos los usuarios (por ejemplo, agregando validaciones adicionales o cambiando la estructura de los datos), solo necesitamos modificar el servicio sin tocar el controlador.
*/




dotenv.config();


class AuthService {

async register(nombre: string, email: string, password: string) {
    const existingUser = await Usuario.findByEmail(email);
    if (existingUser) {
        throw new Error('El correo electrónico ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Usuario(nombre, email, hashedPassword);
    return await newUser.save();
}


async login(email: string, password: string) {
  const usuario = await Usuario.findByEmail(email);
  if (!usuario) {
      return null; // Usuario no encontrado
  }

  const isMatch = await bcrypt.compare(password, usuario.password);
  if (!isMatch) {
      return null; // Contraseña incorrecta
  }

   // Generar el token JWT
   const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '1h' } // El token expira en 1 hora
);

return { usuario, token };
}

 // Método para verificar el token (opcional)
 verifyToken(token: string) {
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
  } catch (error) {
      return null;
  }
}


}

export default new AuthService();
