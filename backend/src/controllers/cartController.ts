import { Response } from 'express';
import { JwtPayload } from '../types/jwtPayload'; // Update path as needed
import { addToCartModel, getproductsInCart } from '../models/cartModel';

// 1. Define authenticated request interface
interface AuthenticatedRequest extends Express.Request {
  body: any;
  user?: JwtPayload;
}

export const getUserCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {

    const userId = req.user?.id;
    console.log(userId);
    
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' }); // 401 for unauthorized
        return;
    }

    try {
        const products = await getproductsInCart(userId);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching cart products:', error);
        res.status(500).json({ error: 'Could not fetch cart products' });
    }
};

export const addToCartController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;  
    const products = req.body.products;
  
    if (!userId) {
      res.status(401).json({ message: 'Authentication required' });
      return;
    }
  
    if (!products || !Array.isArray(products)) {
      res.status(400).json({ message: 'Products must be provided as an array' });
      return;
    }
  
    try {
      await addToCartModel(userId, products);
      res.status(200).json({ 
        status: 'success',
        message: 'Products added to cart'
      });
    } catch (error) {
      console.error('Error adding products to cart:', error);
      res.status(500).json({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
};