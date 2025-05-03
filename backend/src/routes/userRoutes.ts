import express from 'express';
import { getLogin, register, login, getUserProfile, getRegister } from '../controllers/userController';
import { authenticateToken } from '../middleware/auth';
import {  getAllProductsController, getProductByIdController,getUserProductsByCategory } from '../controllers/productsController';
import { addToCartController, getUserCart } from '../controllers/cartController';
import { addProductToWishlist, getUserWishlist, removeProductFromWishlist } from '../controllers/wishlistController';

const router = express.Router();

// user routes
router.get('/login', getLogin).post('/login', login);
router.post('/register', register).get('/register',getRegister);
router.get('/Home', authenticateToken,getUserProfile);

//Product Routes
router.get('/products', getAllProductsController );
router.get('/products/:id', getProductByIdController);
router.get('/products/category/:categoryname', getUserProductsByCategory);
router.get('/:id/cart', authenticateToken, getUserCart).post('/:id/cart', authenticateToken, addToCartController);


//wishlist routes
router.get('/:id/wishlist', authenticateToken, getUserWishlist).post('/:id/wishlist', authenticateToken, addProductToWishlist)
.delete('/:id/wishlist',authenticateToken,removeProductFromWishlist)

export default router;
