import { Request, Response } from 'express';
import prisma from '../prisma';

export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, stock } = req.body;
        const imageUrl = req.file ? `/${req.file.path}` : null;

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseInt(price),
                stock: parseInt(stock),
                imageUrl
            },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error });
    }
};

export const getAllProducts = async (req: Request, res: Response) => {
    const { search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
        deletedAt: null,
    };
    if (search) {
        where.OR = [
            { name: { contains: search as string, mode: 'insensitive' } },
            { description: { contains: search as string, mode: 'insensitive' } },
        ];
    }

    const orderBy: any = {};
    if (sortBy) {
        orderBy[sortBy as string] = sortOrder === 'desc' ? 'desc' : 'asc';
    } else {
        orderBy.createdAt = 'desc';
    }

    try {
        const products = await prisma.product.findMany({
            where,
            skip,
            take: limitNum,
            orderBy,
        });

        const totalProducts = await prisma.product.count({ where });

        res.status(200).json({
            data: products,
            totalPages: Math.ceil(totalProducts / limitNum),
            currentPage: pageNum,
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch products', error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description, price, stock } = req.body;
        
        const dataToUpdate: any = {};
        if (name) dataToUpdate.name = name;
        if (description) dataToUpdate.description = description;
        if (price) dataToUpdate.price = parseInt(price);
        if (stock) dataToUpdate.stock = parseInt(stock);
        if (req.file) dataToUpdate.imageUrl = `/${req.file.path}`;

        const product = await prisma.product.update({
            where: { id },
            data: dataToUpdate,
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product', error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.product.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        res.status(200).json({ message: 'Product successfully soft deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product', error });
    }
};

export const restoreProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.product.update({
            where: { id },
            data: { deletedAt: null },
        });
        res.status(200).json({ message: 'Product successfully restored' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to restore product', error });
    }
};