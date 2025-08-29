import { Router } from 'express';
import { createProduct, getAllProducts, updateProduct, deleteProduct, restoreProduct } from '../controllers/productController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { uploadProduct } from '../middlewares/uploadMiddleware';
import { Role } from '@prisma/client';

const router = Router();

router.get('/', getAllProducts);

router.post('/', authenticate, authorize([Role.ADMIN]), uploadProduct.single('image'), createProduct);
router.patch('/:id', authenticate, authorize([Role.ADMIN]), uploadProduct.single('image'), updateProduct);
router.delete('/:id', authenticate, authorize([Role.ADMIN]), deleteProduct);
router.patch('/:id/restore', authenticate, authorize([Role.ADMIN]), restoreProduct);

export default router;