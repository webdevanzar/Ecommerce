"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByCategory = exports.getProductByid = exports.getAllproducts = void 0;
const db_1 = require("../config/db"); // ✅ correct
const getAllproducts = async () => {
    try {
        const result = await db_1.pool1.query('SELECT * FROM public.products WHERE isdeleted = false');
        console.log('Query Result:', result.rows); // Check if data is returned
        return result.rows; // Return fetched rows (products)
    }
    catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products'); // Throw a custom error
    }
};
exports.getAllproducts = getAllproducts;
const getProductByid = async (id) => {
    try {
        const result = await db_1.pool1.query('SELECT * FROM public.products WHERE id = $1 AND isdeleted = false', [id]);
        return result.rows[0];
    }
    catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Error fetching products'); //
    }
};
exports.getProductByid = getProductByid;
const getProductsByCategory = async (category) => {
    try {
        const result = await db_1.pool1.query('SELECT * FROM public.products WHERE category = $1 AND isdeleted = false', [category]);
        return result.rows;
    }
    catch (error) {
        console.error('Error fetching products by category:', error);
        throw new Error('Error fetching category products');
    }
};
exports.getProductsByCategory = getProductsByCategory;
