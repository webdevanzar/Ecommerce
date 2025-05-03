"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProductsByCategory = exports.getProductByIdController = exports.getAllProductsController = void 0;
const productsModel_1 = require("../models/productsModel");
const getAllProductsController = async (req, res) => {
    try {
        const products = await (0, productsModel_1.getAllproducts)();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not fetch products' });
    }
};
exports.getAllProductsController = getAllProductsController;
const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await (0, productsModel_1.getProductByid)(parseInt(id)); // Fetch product by ID
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return; // Return early if product not found
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Could not fetch product' }); // Handle server error
    }
};
exports.getProductByIdController = getProductByIdController;
const getUserProductsByCategory = async (req, res) => {
    const category = req.params.categoryname;
    if (!category) {
        res.status(400).json({ message: 'category are required' });
        return;
    }
    try {
        const products = await (0, productsModel_1.getProductsByCategory)(category);
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ error: 'Could not fetch products by category' });
    }
};
exports.getUserProductsByCategory = getUserProductsByCategory;
