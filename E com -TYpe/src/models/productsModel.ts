import { pool1 } from '../config/db';  // ✅ correct

export const getAllproducts = async () => {
    try {
        const result = await pool1.query(
            'SELECT * FROM public.products WHERE isdeleted = false',
        );
        console.log('Query Result:', result.rows);  // Check if data is returned
        return result.rows;  // Return fetched rows (products)
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products');  // Throw a custom error
    }
};

export const getProductByid = async (id : number) =>{
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


