import { addToWishlist, checkProductExist, checkUserExist, getWishlistByUserId, removeFromwishList } from '../models/wishlistModel';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../types/express'; 


export const addProductToWishlist = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const { productId } = req.body;

    if (!productId) {
        res.status(400).json({ message: 'Product ID is required.' });
        return;
    }

    try {
        const userExists = await checkUserExist(userId);
        if (!userExists) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }

        const productExists = await checkProductExist(productId);
        if (!productExists) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }

        const result = await addToWishlist(userId, productId);
        res.status(201).json({ status: 'success', message: 'Product added to wishlist.', data: result });
    } catch (error) {
        res.status(500).json({ error: 'Error adding product to wishlist', details: (error as Error).message });
    }
};


export const getUserWishlist = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
  
    try {
      const userExists = await checkUserExist(userId);
      if (!userExists) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
  
      const wishlistItems = await getWishlistByUserId(userId);
  
      res.status(200).json({ status: 'success', products: wishlistItems });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching wishlist', details: (error as Error).message });
    }
  };


 
  
  interface RemoveFromWishlistRequest {
    productId: string;
  }
  
  export const removeProductFromWishlist = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const userId = req.params.id; // User ID from URL
    const { productId } = req.body; // Product ID from request body
  
    if (!productId) {
      res.status(400).json({ message: 'Product ID is required.' });
      return;
    }
  
    try {
      // Check if the user exists
      const userExists = await checkUserExist(userId);
      if (!userExists) {
        res.status(404).json({ message: 'User not found.' });
        return;
      }
  
      // Check if the product exists in the wishlist
      const productExists = await checkProductExist(productId);
      if (!productExists) {
        res.status(404).json({ message: 'Product not found in wishlist.' });
        return;
      }
  
      // Remove product from wishlist
      const result = await removeFromwishList(userId, productId);
  
      res.status(200).json({ status: 'success', message: 'Product removed from wishlist.', data: result });
    } catch (error) {
      res.status(500).json({ error: 'Error removing product from wishlist', details: (error as Error).message });
    }
  };
  
  
