import { Request, Response } from 'express';
import { getAllproducts, getProductByid, getProductsByCategory,   } from '../models/productsModel';


export const getAllProductsController = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await getAllproducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch products' });
    }
};

export const getProductByIdController = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const product = await getProductByid(parseInt(id));  // Fetch product by ID
        
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;  // Return early if product not found
        }

        res.status(200).json(product); 
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Could not fetch product' });  // Handle server error
    }
};

export const getUserProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    const category = req.params.categoryname;
  
    if (!category) {
      res.status(400).json({ message: 'category are required' });
      return;
    }
  
    try {
      const products = await getProductsByCategory(category);
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Could not fetch products by category' });
    }
  };
