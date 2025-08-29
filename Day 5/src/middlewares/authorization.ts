import { Request, Response, NextFunction } from "express";
import { prisma } from "../prisma/client";

// export function requireLogin(req: Request, res: Response, next: NextFunction) {
//   if (!req.session?.user) {
//     return res.status(401).json({ message: "Harus login dulu" });
//   }
//   next();
// }

export function authorizeProductUpdate() {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;
        const productId = parseInt(req.params.productId);

        if (user.role !== "supplier") {
            return res.status(403).json({ message: "Forbidden: Only suppliers can update products" });
        }

        try {
            const supplierStock = await prisma.supplierStock.findUnique({
                where: {
                    productId_supplierId: {
                        productId: productId,
                        supplierId: user.id
                    }
                }
            });

            if (!supplierStock) {
                return res.status(403).json({ message: "Forbidden: You do not have permission to update this product" });
            }

            next();
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    };
}