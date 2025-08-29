import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/authMiddleware';

export const uploadProfilePicture = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    
    const profilePictureUrl = `/${req.file.path}`;

    try {
        await prisma.user.update({
            where: { id: userId },
            data: { profilePicture: profilePictureUrl },
        });
        res.status(200).json({ message: 'Profile picture uploaded successfully.', url: profilePictureUrl });
    } catch (error) {
        res.status(500).json({ message: 'Failed to upload profile picture', error });
    }
};

export const getMyProfile = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                profilePicture: true,
                points: true,
                createdAt: true,
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch profile', error });
    }
}