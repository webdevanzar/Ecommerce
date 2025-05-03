import { pool1 } from '../config/db';  // ✅ correct

export const getproductsInCart = async (userId: number) => {
    try {
      const result = await pool1.query(
        `SELECT p.* 
         FROM cart c 
         JOIN products p ON c.product_id = p.id 
         WHERE c.user_id = $1 AND p.isdeleted = false`,
        [userId]
      );
      console.log('Fetching products for user ID:', userId);
      console.log('Query result:', result.rows);
      return result.rows;
    } catch (error) {
      console.error('Error fetching products in cart:', error); // Updated error message
      throw new Error('Error fetching cart products'); // More accurate error message
    }
  };
  
export const addToCartModel = async (userId: number, products: Array<{ product_id: number, quantity: number }>) => {
    try {
      // Prepare the insert queries for each product
      const insertQueries = products.map((product) => {
        return pool1.query(
          'INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)',
          [userId, product.product_id, product.quantity]
        );
      });
  
      // Execute all insert queries simultaneously
      await Promise.all(insertQueries);
    } catch (error) {
      console.error('Error adding products to cart:', error);
      throw new Error('Error adding products to cart');
    }
};


