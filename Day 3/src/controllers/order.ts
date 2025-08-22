import { prisma } from "../connection/client";
import { Request, Response } from "express";

export const getOrdersSummary = async (req: Request, res: Response) => {
  try {
    // ambil query untuk pagination
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string)  || 5;
    const skip = (page - 1) * limit;

    // group by userId → hitung total group (buat pagination)
    const totalGroups = await prisma.order.groupBy({
      by: ["userId"],
      _count: { id: true },
    });

    const totalPages = Math.ceil(totalGroups.length / limit);

    // ambil summary per user (pakai groupBy)
    const summary = await prisma.order.groupBy({
      by: ["userId"],
      _count: { id: true }, // total order (berapa kali order)
      _sum: { quantity: true }, // total quantity
      orderBy: { userId: "asc" },
      skip,
      take: limit,
    });

    // ambil data user + hitung total belanja (quantity × product.price)
    const result = await Promise.all(
      summary.map(async (s) => {
        const user = await prisma.user.findUnique({
          where: { id: s.userId },
          select: { id: true, name: true, email: true },
        });

        // hitung total belanja user ini
        const ordersWithProducts = await prisma.order.findMany({
          where: { userId: s.userId },
          include: { product: true },
        });

        const totalSpending = ordersWithProducts.reduce(
          (acc, o) => acc + o.quantity * o.product.price,
          0
        );

        return {
          user,
          totalOrders: s._count.id,
          totalQuantity: s._sum.quantity || 0,
          totalSpending,
        };
      })
    );

    res.json({
      page,
      limit,
      totalPages,
      totalUsers: totalGroups.length,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};