import { Request, Response, NextFunction } from "express";
import { prisma } from "../connection/client";

export const updateSupplierStock = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { updates } = req.body;

    const invalidStock = updates.find((item: any) => item.stock < 0);
    if (invalidStock) {
      const error: any = new Error(
        `Stock tidak boleh bernilai negatif (supplierId: ${invalidStock.supplierId}, productId: ${invalidStock.productId}, stock: ${invalidStock.stock})`
      );
      error.status = 400;
      throw error;
    }

    const result: any[] = [];

    await prisma.$transaction(async (tx) => {
      for (const item of updates) {
        const updated = await tx.supplierStock.updateMany({
          where: {
            supplierId: item.supplierId,
            productId: item.productId,
          },
          data: { stock: item.stock },
        });

        if (updated.count === 0) {
          const error: any = new Error(
            `Supplier ${item.supplierId} atau produk ${item.productId} tidak ditemukan`
          );
          error.status = 404;
          throw error;
        }

        const latest = await tx.supplierStock.findFirst({
          where: {
            supplierId: item.supplierId,
            productId: item.productId,
          },
          include: {
            supplier: { select: { id: true, name: true } },
            product: { select: { id: true, title: true } },
          },
        });

        if (latest) result.push(latest);
      }
    });

    res.status(200).json({
      message: "Stock berhasil diperbarui",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
