import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_CONFIG } from '../config/jwt';

// Extended Request with user property
export interface AuthRequest extends Request {
    user?: any;
}

// Middleware to authenticate token
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN format

    if (!token) {
        res.status(401).json({ message: 'Authentication token required' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
        (req as AuthRequest).user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
        return;
    }
}; 