// src/types/express.d.ts
import { JwtPayload } from '../types/jwtPayload'; // Adjust path as needed

// Required to treat this as a module
export {};

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload;
    }
  }
}