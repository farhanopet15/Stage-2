import { Response } from 'express';
import prisma from '../prisma';
import { AuthRequest } from '../middlewares/authMiddleware';
import { Role } from '@prisma/client';

interface OrderItemData {
    productId: string;
    quantity: number;
    price: number;
}

export const createOrder = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const { items } = req.body; // items: [{ productId: string, quantity: number }]

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Order items are required' });
    }

    try {
        const productIds = items.map(item => item.productId);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds }, deletedAt: null },
        });

        if (products.length !== productIds.length) {
            return res.status(404).json({ message: 'One or more products not found or have been deleted' });
        }
        
        let total = 0;
        // Perbaikan di sini: Tambahkan tipe data eksplisit `OrderItemData[]`
        const orderItemsData: OrderItemData[] = [];

        for (const item of items) {
            const product = products.find(p => p.id === item.productId);
            if (!product) {
                return res.status(404).json({ message: `Product with id ${item.productId} not found` });
            }
            if (product.stock < item.quantity) {
                return res.status(400).json({ message: `Not enough stock for ${product.name}` });
            }
            total += product.price * item.quantity;
            orderItemsData.push({
                productId: item.productId,
                quantity: item.quantity,
                price: product.price,
            });
        }
        
        const pointsEarned = Math.floor(total / 10000) * 10;

        const newOrder = await prisma.$transaction(async (tx) => {
            const order = await tx.order.create({
                data: {
                    userId,
                    total,
                    items: {
                        create: orderItemsData,
                    },
                },
                include: { items: true },
            });

            for (const item of items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: { stock: { decrement: item.quantity } },
                });
            }
            
            await tx.user.update({
                where: { id: userId },
                data: { points: { increment: pointsEarned } },
            });

            return order;
        });

        res.status(201).json({ message: 'Order created successfully', order: newOrder, pointsEarned });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order', error });
    }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    try {
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
    const { userId, sortBy, sortOrder, page = 1, limit = 10, groupBy } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {};
    if (userId) {
        where.userId = userId as string;
    }

    const orderBy: any = {};
    if (sortBy) {
        orderBy[sortBy as string] = sortOrder === 'desc' ? 'desc' : 'asc';
    } else {
        orderBy.createdAt = 'desc';
    }

    try {
        if (groupBy === 'userId') {
            const orders = await prisma.order.findMany({
                where,
                orderBy,
                include: { user: { select: { id: true, name: true, email: true } }, items: true },
            });

            const groupedOrders = orders.reduce((acc: any, order) => {
                (acc[order.userId] = acc[order.userId] || []).push(order);
                return acc;
            }, {});

            res.status(200).json(groupedOrders);
        } else {
            const orders = await prisma.order.findMany({
                where,
                skip,
                take: limitNum,
                orderBy,
                include: { user: { select: { name: true, email: true } } },
            });

            const totalOrders = await prisma.order.count({ where });

            res.status(200).json({
                data: orders,
                totalPages: Math.ceil(totalOrders / limitNum),
                currentPage: pageNum,
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch orders', error });
    }
};