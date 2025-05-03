import { adminLogin, createProductController, deleteProductscontroll, getAllOrdersController, getAllProductDatas, getAllusersData, getproductbyId, getuserByid, getUserProductsByCategory, updateProductController } from '../controllers/adminController';
import express from 'express';
import  {authenticateAdmin} from '../middleware/adminauth';
const router = express.Router();


router.post('/login', adminLogin);
router.get('/users', authenticateAdmin, getAllusersData);
router.get('/users/:id', authenticateAdmin,getuserByid);
router.get('/products', authenticateAdmin, getAllProductDatas);
router.get('/products/:id', authenticateAdmin, getproductbyId);
router.get('/products/category/:categoryname', getUserProductsByCategory);
router.post('/products',authenticateAdmin, createProductController);
router.put('/products',authenticateAdmin,updateProductController);
router.delete('/products',authenticateAdmin,deleteProductscontroll);
router.get('/orders', authenticateAdmin, getAllOrdersController);



export default router;

