import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Definir una interfaz para el payload del token JWT
interface JwtPayload {
    id: number;
    email: string;
    iat: number;
    exp: number;
}

// Extender la interfaz Request de Express para incluir `user`
declare module 'express-serve-static-core' {
    interface Request {
        user?: JwtPayload;
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        console.log('Error: No se proporcionó un token');
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('Error: Formato del token incorrecto');
        return res.status(403).json({ message: 'Formato del token incorrecto' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded; // Asignar el payload decodificado a `req.user`
        next();
    } catch (error) {
        console.log('Error: Token inválido');
        return res.status(401).json({ message: 'Token inválido' });
    }
};
