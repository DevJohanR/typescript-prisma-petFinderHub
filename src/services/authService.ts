import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {
    // Método para registrar un usuario
    async register(nombre: string, email: string, password: string) {
        const existingUser = await Usuario.findByEmail(email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está en uso');
        }

        const newUser = new Usuario(nombre, email, password);
        return await newUser.save();
    }

    // Método para manejar el login
    async login(email: string, password: string) {
        const usuario = await Usuario.findByEmail(email);
        if (!usuario) {
            console.log(`Usuario no encontrado: ${email}`);
            return null; // Usuario no encontrado
        }

        // Logs para depuración
        console.log(`Contraseña ingresada: ${password}`);
        console.log(`Hash almacenado en la base de datos: ${usuario.password}`);

        const isMatch = await bcrypt.compare(password, usuario.password);

        if (!isMatch) {
            console.log('Contraseña incorrecta');
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
