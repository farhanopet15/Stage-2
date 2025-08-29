import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/authMiddleware';

export const transferPoints = async (req: AuthRequest, res: Response) => {
    const senderId = req.user!.id;
    const { receiverEmail, amount } = req.body;
    
    const transferAmount = parseInt(amount);

    if (!receiverEmail || !transferAmount || transferAmount <= 0) {
        return res.status(400).json({ message: 'Receiver email and a valid amount are required.' });
    }

    try {
        await prisma.$transaction(async (tx) => {
            const sender = await tx.user.findUnique({
                where: { id: senderId },
            });

            if (!sender) {
                throw new Error('Sender not found.');
            }

            if (sender.points < transferAmount) {
                throw new Error('Insufficient points balance.');
            }

            const receiver = await tx.user.findUnique({
                where: { email: receiverEmail },
            });

            if (!receiver) {
                throw new Error('Receiver not found.');
            }

            if (sender.id === receiver.id) {
                throw new Error('Cannot transfer points to yourself.');
            }

            await tx.user.update({
                where: { id: senderId },
                data: { points: { decrement: transferAmount } },
            });

            await tx.user.update({
                where: { id: receiver.id },
                data: { points: { increment: transferAmount } },
            });

            await tx.pointTransaction.create({
                data: {
                    senderId,
                    receiverId: receiver.id,
                    amount: transferAmount,
                },
            });
        });

        res.status(200).json({ message: 'Points transferred successfully.' });
    } catch (error: any) {
        if (error.message === 'Insufficient points balance.') {
            return res.status(400).json({ message: error.message });
        }
        if (error.message === 'Receiver not found.') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Cannot transfer points to yourself.') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Failed to transfer points', error: error.message });
    }
};

export const getMyPoints = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { points: true }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ points: user.points });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch points', error });
    }
};