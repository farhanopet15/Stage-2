import { Router } from 'express';
import { uploadProfilePicture, getMyProfile } from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
import { uploadProfile } from '../middlewares/uploadMiddleware';

const router = Router();

router.get('/me', authenticate, getMyProfile);
router.post('/upload-profile', authenticate, uploadProfile.single('profile'), uploadProfilePicture);

export default router;