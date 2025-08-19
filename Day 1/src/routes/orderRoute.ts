import express from 'express';
import { getOrders, createOrder } from '../controllers/orderController';

const router = express.Router();

router.get('/orders', getOrders);
router.post('/orders', createOrder);

export default router;