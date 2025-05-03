import { pool1 } from "../config/db";
import bcrypt from 'bcryptjs';

export const getAdminLogin = async (email: string) => {
    try {
      const result = await pool1.query(
        'SELECT * FROM public.admin_users WHERE email = $1',
        [email]
      );
  
      if (result.rows.length === 0) {
        return null; // No user found
      }
  
      return result.rows[0]; // Return the first row (admin user)
    } catch (error) {
      console.error('Error querying the database:', error);
      throw new Error('Database error');
    }
  };
  

export const comparePasswords = async (plain: string, hash: string) => {
    return bcrypt.compare(plain, hash);
};


export const getallUsers = async () =>{
   try {
      const result = await pool1.query(
        'SELECT * FROM public.users WHERE isdeleted = false'
      );

      return result.rows;
   } catch (error) {
    console.error('Error querying the database:', error);
    throw new Error('Database error');
   }
};

export const getUsersByid = async (id : number) =>{
  try {
    const result = await pool1.query(
       'SELECT * FROM public.users WHERE id = $1 AND isdeleted = false',
       [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');  //
  }
};

export const getallProducts = async () =>{
  try {
     const result = await pool1.query(
       'SELECT * FROM public.products WHERE isdeleted = false'
     );

     return result.rows;
  } catch (error) {
   console.error('Error querying the database:', error);
   throw new Error('Database error');
  }
};

export const getProductsByid = async (id : number) =>{
  try {
    const result = await pool1.query(
       'SELECT * FROM public.products WHERE id = $1 AND isdeleted = false',
       [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error fetching products');  //
  }
};

export const getProductsByCategory = async (category: string) => {
  try {
    const result = await pool1.query(
      'SELECT * FROM public.products WHERE category = $1 AND isdeleted = false',
      [category]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Error fetching category products');
  }
};

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  isdeleted: boolean;
  quantity: number;
}

export const createProducts = async (product: Product) => {
  const { id, title, description, image, price, category, isdeleted, quantity } = product;

  try {
    const query = `
      INSERT INTO public.products (id, title, description, image, price, category, isdeleted, quantity)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `;

    await pool1.query(query, [id, title, description, image, price, category, isdeleted, quantity]);
  } catch (error) {
    console.error('Error creating products:', error);
    throw new Error('Error creating products');
  }
};

export const updateProducts = async (product: Product) => {
  const { id, title, description, image, price, category, isdeleted, quantity } = product;

  try {
    const query = `
      UPDATE products 
      SET title = $1, description = $2, image = $3, price = $4, category = $5, isdeleted = $6, quantity = $7
      WHERE id = $8 RETURNING *
    `;

    await pool1.query(query, [title, description, image, price, category, isdeleted, quantity, id]);
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Error updating product');
  }
};


export const deleteidProducts = async (id: string) => {
   try {
       const result = await pool1.query('DELETE FROM public.products WHERE id = $1',[id]);

       if(result.rowCount === 0){
         throw new Error('Product not found');
       }
   } catch (error) {
      console.error('Error Deleting product:', error);
      throw new Error('Error Deleting product');
   } 
}

export const getAllOrders = async () => {
  try {
    const result = await pool1.query(`
      SELECT o.id AS order_id, o.user_id, o.purchase_date, o.total_price, o.total_items
      FROM orders o
      JOIN users u ON o.user_id = u.id
      JOIN order_items oi ON o.id = oi.order_id  -- Join with order_items to get order_id
      ORDER BY o.purchase_date DESC;
    `);
    return result.rows;
  } catch (error) {
    console.error('Error listing the orders:', error);
    throw new Error('Error Listing the orders');
  }
};
