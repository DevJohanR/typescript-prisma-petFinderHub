import bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import crypto from 'crypto'; // <-- Para generar tokens de verificación
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail'; // <-- Para enviar correos electrónicos con SendGrid
import dotenv from 'dotenv';
import { prisma } from '../db';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string); // <-- API key de SendGrid

class AuthService {
    // Método para registrar un usuario
    async register(nombre: string, email: string, password: string) {
        const existingUser = await Usuario.findByEmail(email);
        if (existingUser) {
            throw new Error('El correo electrónico ya está en uso');
        }

        const newUser = new Usuario(nombre, email, password);
        const savedUser = await newUser.save();

             // Generar el token de verificación
             const verificationToken = crypto.randomBytes(32).toString('hex'); // <-- Generar un token único de verificación

             // Guardar el token de verificación en la base de datos
             await prisma.verificationToken.create({
                 data: {
                     token: verificationToken,
                     userId: savedUser.id,
                 },
             }); // <-- Guardar el token en la base de datos con una relación al usuario
     
             // Enviar correo de verificación
             await this.sendVerificationEmail(savedUser.email, verificationToken); // <-- Enviar correo con el token
     
             return savedUser;

    }

// Método para enviar el correo de verificación
async sendVerificationEmail(userEmail: string, token: string) {
    const verificationUrl = `http://localhost:3000/api/auth/verify?token=${token}`; // <-- URL para la verificación

    const message = {
        to: userEmail,
        from: 'ejohan7777@gmail.com',
        subject: 'Verify Your Email',
        text: `Please verify your email by clicking the following link: ${verificationUrl}`,
        html: `<p>Please verify your email by clicking the following link: <a href="${verificationUrl}">Verify Email</a></p>`,
    };

    await sgMail.send(message); // <-- Enviar el correo con SendGrid
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
