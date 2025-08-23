import { Request, Response, NextFunction } from "express";

import {prisma} from "../connection/client"

export const getAlluser = async (req: Request, res: Response) =>{
    try {
    const users = await prisma.user.findMany({})
    res.status(200).json(users)
  } catch (error) {
    
  }
}


export const getAllTransactions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const transactions = await prisma.pointTransaction.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        fromUser: {
          select: { id: true, name: true, email: true }
        },
        toUser: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    res.status(200).json({
      total: transactions.length,
      data: transactions
    });
  } catch (error) {
    next(error);
  }
};



export const transferPoints = async (req: Request, res: Response, next: any) => {
  const { amount, senderId, receiverId } = req.body;

  try {
    if (amount <= 0) {
      throw { status: 400, message: "Gk punya saldo lu bro" };
    }

    const [sender, receiver] = await Promise.all([
      prisma.user.findUnique({ where: { id: senderId } }),
      prisma.user.findUnique({ where: { id: receiverId } }),
    ]);

    if (!sender) throw { status: 404, message: "pengirimnya gk ada" };
    if (!receiver) throw { status: 404, message: "ngirim ke siapa lu, kgk ada user itu bre" };

    if (sender.points < amount) {
      throw { status: 400, message: "gk usah sok ngirim, point lu kurang" };
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: senderId },
        data: { points: { decrement: amount } },
      });

      await tx.user.update({
        where: { id: receiverId },
        data: { points: { increment: amount } },
      });

      await tx.pointTransaction.create({
        data: {
          senderId,receiverId, amount,
        },
      });
    });

    res.status(200).json({
      message: "Transfer berhasil",
      data: { senderId, receiverId, amount },
    });
  } catch (error: any) {
    console.error("Transfer Error:", error);

    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
