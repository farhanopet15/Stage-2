import { Request, Response } from "express";
// import { products, carts, CartItem } from "../models/post-model";
import {prisma} from "../connection/client"

// GET all products
export const getProducts = async (req: Request, res: Response) => {
  const {sortBy = "id", order = "asc", minPrice, maxPrice,page = "1", limit = "3"} = req.query

  const filters: any = {};
  if (minPrice) filters.price = {gte: parseFloat(minPrice as string)};
  if (maxPrice) filters.price = {...(filters.price || {}), lte: parseFloat(maxPrice as string)};

  const take = parseInt(limit as string); 
  const currentPage = parseInt(page as string); 
  const skip = (currentPage - 1) * take

  try {
    const products =  await prisma.product.findMany({
      where: filters,
      orderBy: {[sortBy as string]: order as "asc" | "desc",},
      take,
      skip,
    })


    const total = await prisma.product.count({where: filters})
    const totalPages = Math.ceil(total / take);
    
    res.status(200).json({
      data: products,
      total,
      page: currentPage,
      limit: take,
      totalPages
    })
  } catch (error) {
    res.status(500).json({error:"gagal bre"})
  }
};

// GET all cart items
export const getCart = async (req: Request, res: Response) => {
  try {
    const carts = await prisma.cart.findMany({})
    res.status(200).json(carts)
  } catch (error) {
    
  }
};

//GET all cart from one user
export const getCartProducts = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: { carts: true },
    });

    if (!user) {
      return res.status(404).json({ message: "Gk ada usernya" });
    }

    res.status(200).json({ 
      id: user.id,
      name: user.name, 
      carts: user.carts,});
  } catch (error) {
    console.error("Gk ada usernya bre", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// GET orders summary
export const getOrderSummary = async (req: Request, res: Response) => {
  const { limit = 5, offset = 0 } = req.query;

  try {
    // Group carts by userId
    const summary = await prisma.cart.groupBy({
      by: ["userId"],
      _sum: { quantity: true },
      _count: { id: true },
      orderBy: { userId: "asc" },
      skip: Number(offset),
      take: Number(limit),
    });

    const total = await prisma.cart.groupBy({
      by: ["userId"],
      _sum: { quantity: true },
    });

    // Enrich data dengan nama user
    const enriched = await Promise.all(
      summary.map(async (s) => {
        const user = await prisma.user.findUnique({
          where: { id: s.userId },
        });
        return {
          userId: s.userId,
          userName: user?.name,
          totalQuantity: s._sum.quantity || 0,
          totalOrders: s._count.id,
        };
      })
    );

    res.status(200).json({
      data: enriched,
      meta: {
        totalUsers: total.length,
        limit: Number(limit),
        offset: Number(offset),
      },
    });
  } catch (error) {
    console.error("Error getOrderSummary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// CREATE product
export const createProduct = async(req: Request, res: Response) => {  
    try {
        const { title, price } = req.body;
        const product = await prisma.product.create({
            data: {title, price}
        })
        res.status(201).json(product)
  } catch (error) {
    res.status(500).json({error:"gagal nambah bre"})
  }
};


// add item to cart
// export const addToCart = (req: Request, res: Response) => {
//   const { userId, productId, quantity } = req.body;

//   const product = products.find(p => p.id === Number(productId));
//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   const existing = carts.find(c => c.userId === Number(userId) && c.productId === Number(productId));

//   if (existing) {
//     existing.quantity += quantity; 
//     return res.json(existing);
//   }

//   const newCartItem: CartItem = {
//     userId: Number(userId),
//     productId: Number(productId),
//     quantity: Number(quantity),
//   };

//   carts.push(newCartItem);
//   res.status(201).json(newCartItem);
// };



// UPDATE product
export const updateProduct = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, price } = req.body;

        const product = await prisma.product.update({
            where: {id: Number(id)},
            data: {
                title, price
            }
        })
        res.status(200).json(product)
  } catch (error) {
    
  }
};

//update cart item
// export const updateCartItem = (req: Request, res: Response) => {
//   const { userId, productId } = req.params;
//   const { quantity } = req.body;

//   const cartItem = carts.find(
//     c => c.userId === Number(userId) && c.productId === Number(productId)
//   );

//   if (!cartItem) {
//     return res.status(404).json({ message: "Cart item not found" });
//   }

//   cartItem.quantity = Number(quantity);
//   res.json(cartItem);
// };


// DELETE product
export const deleteProduct = async(req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await prisma.product.delete({
            where: {id: Number(id)}
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({error:"gagal delete brother"})
    }
  
};


// DELETE cart item
// export const deleteCartItem = (req: Request, res: Response) => {
//   const { userId, productId } = req.params;

//   const index = carts.findIndex(
//     c => c.userId === Number(userId) && c.productId === Number(productId)
//   );

//   if (index === -1) {
//     return res.status(404).json({ message: "Cart item not found" });
//   }

//   const deleted = carts.splice(index, 1);
//   res.json(deleted[0]);
// };


