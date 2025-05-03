import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string;

const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token){
    res.status(401).json({ message: 'Access token required' });
   return;  
}
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string, email: string };
    (req as any).admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export {authenticateAdmin}