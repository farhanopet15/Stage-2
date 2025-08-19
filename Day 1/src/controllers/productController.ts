import { Request, Response } from 'express';
import { Product, products } from '../models/productModel';

export const getProducts = (req: Request, res: Response): void => {
    res.json(products);
};

export const getProductById = (req: Request, res: Response): void => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export const createProduct = (req: Request, res: Response): void => {
    const { name, price } = req.body;
    if (!name || !price) {
        res.status(400).json({ message: 'Name and price are required' });
        return;
    }
    const newProduct: Product = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        name,
        price,
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
};

export const updateProduct = (req: Request, res: Response): void => {
    const productId = parseInt(req.params.id, 10);
    const { name, price } = req.body;
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], name, price };
        res.json(products[productIndex]);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
};

export const deleteProduct = (req: Request, res: Response): void => {
    const productId = parseInt(req.params.id, 10);
    const initialLength = products.length;
    const updatedProducts = products.filter(p => p.id !== productId);

    if (updatedProducts.length < initialLength) {
        products.splice(0, products.length, ...updatedProducts);
        res.status(200).json({ message: `Product with ID ${productId} deleted successfully.` });
    } else {
        res.status(404).json({ message: `Product with ID ${productId} not found.` });
    }
};