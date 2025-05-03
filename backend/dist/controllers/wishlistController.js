"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWishlist = exports.addProductToWishlist = void 0;
const wishlistModel_1 = require("../models/wishlistModel");
const addProductToWishlist = async (req, res) => {
    const userId = req.params.id;
    const { productId } = req.body;
    if (!productId) {
        res.status(400).json({ message: 'Product ID is required.' });
        return;
    }
    try {
        const userExists = await (0, wishlistModel_1.checkUserExist)(userId);
        if (!userExists) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const productExists = await (0, wishlistModel_1.checkProductExist)(productId);
        if (!productExists) {
            res.status(404).json({ message: 'Product not found.' });
            return;
        }
        const result = await (0, wishlistModel_1.addToWishlist)(userId, productId);
        res.status(201).json({ status: 'success', message: 'Product added to wishlist.', data: result });
    }
    catch (error) {
        res.status(500).json({ error: 'Error adding product to wishlist', details: error.message });
    }
};
exports.addProductToWishlist = addProductToWishlist;
const getUserWishlist = async (req, res) => {
    const userId = req.params.id;
    try {
        const userExists = await (0, wishlistModel_1.checkUserExist)(userId);
        if (!userExists) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        const wishlistItems = await (0, wishlistModel_1.getWishlistByUserId)(userId);
        res.status(200).json({ status: 'success', products: wishlistItems });
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching wishlist', details: error.message });
    }
};
exports.getUserWishlist = getUserWishlist;
