"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartModel = exports.getproductsInCart = void 0;
const db_1 = require("../config/db"); // ✅ correct
const getproductsInCart = async (userId) => {
    try {
        const result = await db_1.pool1.query(`SELECT p.* 
         FROM cart c 
         JOIN products p ON c.product_id = p.id 
         WHERE c.user_id = $1 AND p.isdeleted = false`, [userId]);
        console.log('Fetching products for user ID:', userId);
        console.log('Query result:', result.rows);
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching products in cart:', error); // Updated error message
        throw new Error('Error fetching cart products'); // More accurate error message
    }
};
exports.getproductsInCart = getproductsInCart;
const addToCartModel = async (userId, products) => {
    try {
        // Prepare the insert queries for each product
        const insertQueries = products.map((product) => {
            return db_1.pool1.query('INSERT INTO cart (user_id, product_id, quantity) VALUES ($1, $2, $3)', [userId, product.product_id, product.quantity]);
        });
        // Execute all insert queries simultaneously
        await Promise.all(insertQueries);
    }
    catch (error) {
        console.error('Error adding products to cart:', error);
        throw new Error('Error adding products to cart');
    }
};
exports.addToCartModel = addToCartModel;
