import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getProduct = async(req:Request, res:Response)=>{
    try {
        const id = parseInt(req.params.id);
        const products = await prisma.product.findUnique({ where: { id } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error:"Failed to Get Product" });
    }
}

export const getProducts = async(req:Request, res:Response)=>{
    try {
        const products = await prisma.product.findMany()
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error:"Failed to fetch Data" });
    }
}

export const createProduct = async (req: Request, res: Response)=>{
    try {
        const { name, price } = req.body;
        const product = await prisma.product.create({
            data: {name, price: parseFloat(price) }, 
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error:"Failed to Create Product" });    
    }
}

export const updateProduct = async(req:Request, res:Response)=>{
    try {
        const id = parseInt(req.params.id)
        const {name, price} = req.body;
        const products = await prisma.product.update({where: {id}, data: {name, price}});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error:"Failed to Update Product" });
    }
}

export const deleteProduct = async(req:Request, res:Response)=>{
    try {
        const id = parseInt(req.params.id);
        const products = await prisma.product.delete({ where: { id } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error:"Success to Delete Product" });
    }
}
