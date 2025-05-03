import { pool1 } from '../config/db'; // Assuming you're using a database pool like pg

export const checkUserExist = async (userId: string) =>{
    try {
       const result = await pool1.query(
    'SELECT * FROM users WHERE id = $1', [userId]
   );
      return result.rows.length > 0;
    } catch (error) {
      console.error('User already Exist:', error);
      throw new Error('User already Exist');
    }
};

export const checkProductExist = async (productId : string) =>{
   try {
      const result = await pool1.query(
        `SELECT * FROM public.products WHERE id = $1`,[productId]
      );
      return result.rows.length > 0;
   } catch (error) {
    console.error('Product already Exist:', error);
    throw new Error('Product already Exist');
   }
};

export const addToWishlist = async (userId: string, productId: string) => {
    try {
      // Check if the user and product exist
      const userExists = await checkUserExist(userId);
      const productExists = await checkProductExist(productId);
  
      if (!userExists) {
        throw new Error('User does not exist');
      }
  
      if (!productExists) {
        throw new Error('Product does not exist');
      }
  
      // Convert string IDs to integers before inserting
      const result = await pool1.query(
        'INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) RETURNING *',
        [parseInt(userId), parseInt(productId)]
      );
  
      if (result.rowCount && result.rowCount > 0) {
        return { status: 'success', wishlistItem: result.rows[0] };
      } else {
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      throw new Error(`Error adding to wishlist: ${(error as Error).message}`);
    }
  };
  
export const getWishlistByUserId = async (userId: string) => {
    try {
      const result = await pool1.query(`
        SELECT p.* FROM wishlists w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = $1
      `, [userId]);
  
      return result.rows;
    } catch (error) {
      console.error('Error fetching userid to wishlist:', error);
      throw new Error('Error fetching userid to wishlist');
    }
};

export const isProductInWishlist = async (userId: string, productId: string)=> {
  const result = await pool1.query(
    'SELECT 1 FROM wishlists WHERE user_id = $1 AND product_id = $2',
    [userId, productId]
  );
  if (!result.rowCount || result.rowCount === 0) {
    throw new Error('Product not found in wishlist');
  }
};

export const removeFromwishList = async (userId: string, productId: string) => {
  try {
    const result = await pool1.query(
      'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2 RETURNING *',
      [userId, productId]
    );

    if (result.rowCount === 0) {
      throw new Error('Product not found in wishlist');
    }

    return result.rows[0];
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw new Error('Error removing product from wishlist');
  }
};
