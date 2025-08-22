import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const getProducts = (req: Request, res: Response) => {
    const {
        sortBy,
        order,
        minPrice,
        maxPrice,
        limit,
    }= req.query
};

// const filter : any  = {};
// if (minPrice) filter.price = { gte : parseFloat(minPrice as string) };
// if (maxPrice)
//     filters.price = {
//         ...(filters.price || {}),
//     lte: parseFloat(maxPrice as string),
// };

