import { createProducts, deleteidProducts, getAdminLogin, getAllOrders, getallProducts, getallUsers, getProductsByCategory, getProductsByid, getUsersByid, updateProducts } from '../models/adminModel';
import { comparePasswords } from '../models/adminModel';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const JWTSECRET = process.env.JWT_SECRET;

export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    res.status(400).json({ message: 'All fields are required' });
    return;
  }

  try {
    const admin = await getAdminLogin(email); 
    console.log(admin);

    if (!admin) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await comparePasswords(password, admin.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    console.log(isMatch);

    if (!JWTSECRET) {
      res.status(500).json({ message: 'Server configuration error: JWT_SECRET is not defined' });
      return;
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      JWTSECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Admin login error:', error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Server Error', error: (error as Error).message });
    }
  }
};

export const getAllusersData = async (req:Request,res:Response) :Promise<void>=>{
   try {
      const users = await getallUsers();
      res.status(200).json({message:'Successfully fetch users',users:users})
   } catch (error) {
      res.status(500).json({message:'Failed to fetch user Data',error:error})
   }
};

export const getuserByid = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const product = await getUsersByid(parseInt(id));         
        if (!product) {
            res.status(404).json({ error: 'user not found' });
            return;  
        }
        res.status(200).json(product); 
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Could not fetch user' });  
    }
};

export const getAllProductDatas = async (req:Request,res:Response) :Promise<void>=>{
  try {
     const Products = await getallProducts();
     res.status(200).json({message:'Successfully fetch Products',Products:Products})
     return;
  } catch (error) {
     res.status(500).json({message:'Failed to fetch Product Data',error:error})
  }
};

export const getproductbyId = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
      const product = await getProductsByid(parseInt(id));         
      if (!product) {
          res.status(404).json({ error: 'Product not found' });
          return;  
      }
      res.status(200).json(product); 
  } catch (error) {
      console.error('Error fetching Product:', error);
      res.status(500).json({ error: 'Could not fetch Product' });  
  };
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


  
  export const createProductController = async (req: Request, res: Response): Promise<void> => {
    try {
      let { id, title, description, image, price, category, isdeleted, quantity } = req.body;
  
      // Convert values to correct types
      price = Number(price);
      quantity = Number(quantity);
      isdeleted = isdeleted === 'true' ? true : false;
  
      if (!title || !description || !image || typeof price !== 'number' || isNaN(price) || !category || typeof quantity !== 'number' || isNaN(quantity)) {
        res.status(400).json({ status: 'fail', message: 'All fields are required and must be valid.' });
        return;
      }
  
      if (!id) {
        id = uuidv4();
      }
  
      await createProducts({
        id,
        title,
        description,
        image,
        price,
        category,
        isdeleted,
        quantity,
      });
  
      res.status(201).json({
        status: 'success',
        message: 'Successfully created a product.',
      });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to create product.',
      });
    }
  };
  
function uuidv4(): any {
  throw new Error('Function not implemented.');
}


export const updateProductController = async (req: Request, res: Response): Promise<void> => {
  try {
    let { id, title, description, image, price, category, isdeleted, quantity } = req.body;

    // Ensure ID is present
    if (!id) {
      res.status(400).json({ status: 'fail', message: 'Product ID is required for update.' });
      return;
    }

    // Convert values to correct types
    price = Number(price);
    quantity = Number(quantity);
    isdeleted = isdeleted === 'true' || isdeleted === true;

    // Validate required fields
    if (!title || !description || !image || !category || isNaN(price) || isNaN(quantity)) {
      res.status(400).json({ status: 'fail', message: 'All fields are required and must be valid.' });
      return;
    }

    await updateProducts({
      id,
      title,
      description,
      image,
      price,
      category,
      isdeleted,
      quantity,
    });

    res.status(200).json({
      status: 'success',
      message: 'Successfully updated a product.',
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update product.',
    });
  }
};


export const deleteProductscontroll = async(req:Request,res:Response):Promise<void> => {
   const {id} = req.body;

   if(!id){
     res.status(400).json({message:'Product id is required'});
     return;
   }

   try {
      await deleteidProducts(id);
      res.status(200).json({message : 'Product deleted successfully'});
   } catch (error) {
     res.status(404).json({
      status: 'error',
      message: error || 'Failed to delete product.',
    });
   }
};


export const getAllOrdersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderDetails = await getAllOrders();

    res.status(200).json({
      status: 'success',
      message: 'Successfully fetched order details.',
      data: orderDetails,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch order details.',
    });
  }
};



