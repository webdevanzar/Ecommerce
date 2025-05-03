"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToCartController = exports.getUserCart = void 0;
const cartModel_1 = require("../models/cartModel");
const getUserCart = async (req, res) => {
    // 2. Safe property access with optional chaining
    const userId = req.user?.id;
    console.log(userId);
    if (!userId) {
        res.status(401).json({ message: 'User not authenticated' }); // 401 for unauthorized
        return;
    }
    try {
        const products = await (0, cartModel_1.getproductsInCart)(userId);
        res.status(200).json(products);
    }
    catch (error) {
        console.error('Error fetching cart products:', error);
        res.status(500).json({ error: 'Could not fetch cart products' });
    }
};
exports.getUserCart = getUserCart;
const addToCartController = async (req, res) => {
    const userId = req.user?.id; // Safe access
    const products = req.body.products;
    if (!userId) {
        res.status(401).json({ message: 'Authentication required' }); // 401 for unauthorized
        return;
    }
    if (!products || !Array.isArray(products)) {
        res.status(400).json({ message: 'Products must be provided as an array' });
        return;
    }
    try {
        await (0, cartModel_1.addToCartModel)(userId, products);
        res.status(200).json({
            status: 'success',
            message: 'Products added to cart'
        });
    }
    catch (error) {
        console.error('Error adding products to cart:', error);
        res.status(500).json({
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};
exports.addToCartController = addToCartController;
