import { NextFunction, Request, Response } from "express";
import { prisma } from "../prisma/client";
import { loginSupplier, addProduct } from "../services/supplierService";
import { loginSchema } from "../validation/authValidation";
import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
//   description: Joi.string().optional(),
});

export async function handleSupplierLogin(req: Request, res: Response) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.message });
        }

        const { email, password } = req.body;
        const result = await loginSupplier(email, password);
        res.json({ message: "Login success", ...result });
    } catch (err: any) {
        res.status(401).json({ message: err.message });
    }
}

export async function handleAddProduct(req: Request, res: Response) {
  try {
    const { title, price } = req.body;
    const user = (req as any).user;

    if (user.role !== "supplier") {
      return res.status(403).json({ message: "Only suppliers can add products" });
    }

    // buat product
    const newProduct = await prisma.product.create({
      data: {
        title,
        price,
        stocks: {
          create: {
            supplierId: user.id,
            stock: 0,
          },
        },
      },
    });

    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}


export async function getSupplierProducts(req: Request, res: Response) {
    try {
        const user = (req as any).user;
        const supplierStocks = await prisma.supplierStock.findMany({
            where: { supplierId: user.id },
            include: { product: true }
        });
        const products = supplierStocks.map(stock => stock.product);
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: "Error fetching products" });
    }
}