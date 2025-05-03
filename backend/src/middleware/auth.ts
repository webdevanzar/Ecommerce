import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { JwtPayload } from '../types/jwtPayload';

const JWTSECRET = process.env.JWT_SECRET;

if (!JWTSECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
}

// Explicitly define authenticated request interface
interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

const authenticateToken = async (
  req: AuthenticatedRequest,  // Use the extended type here
  res: Response,
  next: NextFunction
): Promise<void> => {
    const authorizationHeader = req.header('Authorization');
    
    if (!authorizationHeader) {
        res.status(401).json({ error: 'Access denied. No token provided.' });
        return;
    }

    const token = authorizationHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Token format is incorrect.' });
        return;
    }

    try {
        const decoded = await jwt.verify(token, JWTSECRET) as JwtPayload;
        req.user = decoded; // No more type error!
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

export { authenticateToken };