"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middleware/auth");
const productsController_1 = require("../controllers/productsController");
const cartController_1 = require("../controllers/cartController");
const wishlistController_1 = require("../controllers/wishlistController");
const router = express_1.default.Router();
// user routes
router.get('/login', userController_1.getLogin).post('/login', userController_1.login);
router.post('/register', userController_1.register).get('/register', userController_1.getRegister);
router.get('/Home', auth_1.authenticateToken, userController_1.getUserProfile);
//Product Routes
router.get('/products', productsController_1.getAllProductsController);
router.get('/products/:id', productsController_1.getProductByIdController);
router.get('/products/category/:categoryname', productsController_1.getUserProductsByCategory);
router.get('/:id/cart', auth_1.authenticateToken, cartController_1.getUserCart).post('/:id/cart', auth_1.authenticateToken, cartController_1.addToCartController);
//wishlist routes
router.get('/:id/wishlist', auth_1.authenticateToken, wishlistController_1.getUserWishlist).post('/:id/wishlist', auth_1.authenticateToken, wishlistController_1.addProductToWishlist);
exports.default = router;
