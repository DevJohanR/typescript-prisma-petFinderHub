import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req: Request, res: Response, next: NextFunction): Response | void => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET as string);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido' });
    }
};
