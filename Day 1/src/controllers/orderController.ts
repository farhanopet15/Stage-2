import { Request, Response } from 'express';
import { Order, orders } from '../models/orderModel';
import { products } from '../models/productModel';

export const getOrders = (req: Request, res: Response): void => {
    res.json(orders);
};

export const createOrder = (req: Request, res: Response): void => {
    const { productIds } = req.body;
    if (!productIds || !Array.isArray(productIds)) {
        res.status(400).json({ message: 'productIds array is required' });
        return;
    }

    const items = productIds.map(id => {
        const product = products.find(p => p.id === id);
        return product ? { productId: product.id, name: product.name, price: product.price } : null;
    }).filter(item => item !== null);

    if (items.length === 0) {
        res.status(400).json({ message: 'No valid products found' });
        return;
    }

    const newOrder: Order = {
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1,
        items,
        total: items.reduce((sum, item) => sum + (item?.price || 0), 0),
        createdAt: new Date(),
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
};