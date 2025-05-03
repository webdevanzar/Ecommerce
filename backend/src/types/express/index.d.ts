import { JwtPayload } from '../jwtPayload';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user?: { id: string;};
  params: { id: string }; 
}