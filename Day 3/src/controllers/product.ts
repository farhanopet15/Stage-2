import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getProducts = async (req: Request, res: Response) => {
    const { search, sortBy, sortOrder, page = 1, limit = 10 } = req.query;

    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (search) {
        where.name = {
            contains: search as string,
            mode: "insensitive",
        };
    }

    const orderBy: any = {};
    if (sortBy && sortOrder) {
        orderBy[sortBy as string] = sortOrder as "asc" | "desc";
    }

    try {
        const products = await prisma.product.findMany({
            where,
            orderBy,
            skip: offset,
            take: limitNumber,
        });

        const totalProducts = await prisma.product.count({ where });

        res.status(200).json({
            data: products,
            total: totalProducts,
            page: pageNumber,
            totalPages: Math.ceil(totalProducts / limitNumber),
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching products." });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, price, stock } = req.body;
    try {
        const product = await prisma.product.create({
            data: { name, price, stock },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the product." });
    }
};

export const getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });
        if (!product) {
            return res.status(404).json({ error: "Product not found." });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the product." });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, price, stock } = req.body;
    try {
        const product = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, price, stock },
        });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the product." });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.product.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the product." });
    }
};