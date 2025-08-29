import { Router } from 'express';
import { transferPoints, getMyPoints } from '../controllers/pointController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

router.post('/transfer', authenticate, authorize([Role.USER]), transferPoints);
router.get('/my-points', authenticate, authorize([Role.USER]), getMyPoints);

export default router;