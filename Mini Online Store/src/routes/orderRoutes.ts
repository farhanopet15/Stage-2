import { Router } from 'express';
import { createOrder, getMyOrders, getAllOrders } from '../controllers/orderController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

router.post('/', authenticate, authorize([Role.USER]), createOrder);
router.get('/my-orders', authenticate, authorize([Role.USER]), getMyOrders);
router.get('/', authenticate, authorize([Role.ADMIN]), getAllOrders);

export default router;