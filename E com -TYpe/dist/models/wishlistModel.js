"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWishlistByUserId = exports.addToWishlist = exports.checkProductExist = exports.checkUserExist = void 0;
const db_1 = require("../config/db"); // Assuming you're using a database pool like pg
const checkUserExist = async (userId) => {
    try {
        const result = await db_1.pool1.query('SELECT * FROM users WHERE id = $1', [userId]);
        return result.rows.length > 0;
    }
    catch (error) {
        console.error('User already Exist:', error);
        throw new Error('User already Exist');
    }
};
exports.checkUserExist = checkUserExist;
const checkProductExist = async (productId) => {
    try {
        const result = await db_1.pool1.query(`SELECT * FROM public.products WHERE id = $1`, [productId]);
        return result.rows.length > 0;
    }
    catch (error) {
        console.error('Product already Exist:', error);
        throw new Error('Product already Exist');
    }
};
exports.checkProductExist = checkProductExist;
const addToWishlist = async (userId, productId) => {
    try {
        // Check if the user and product exist
        const userExists = await (0, exports.checkUserExist)(userId);
        const productExists = await (0, exports.checkProductExist)(productId);
        if (!userExists) {
            throw new Error('User does not exist');
        }
        if (!productExists) {
            throw new Error('Product does not exist');
        }
        // Convert string IDs to integers before inserting
        const result = await db_1.pool1.query('INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) RETURNING *', [parseInt(userId), parseInt(productId)]);
        if (result.rowCount && result.rowCount > 0) {
            return { status: 'success', wishlistItem: result.rows[0] };
        }
        else {
            throw new Error('Failed to add to wishlist');
        }
    }
    catch (error) {
        console.error('Error adding to wishlist:', error);
        throw new Error(`Error adding to wishlist: ${error.message}`);
    }
};
exports.addToWishlist = addToWishlist;
const getWishlistByUserId = async (userId) => {
    try {
        const result = await db_1.pool1.query(`
        SELECT p.* FROM wishlists w
        JOIN products p ON w.product_id = p.id
        WHERE w.user_id = $1
      `, [userId]);
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching wishlist:', error);
        throw new Error('Error fetching wishlist');
    }
};
exports.getWishlistByUserId = getWishlistByUserId;
