import express = require("express");
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCart,
  getCartProducts,
  getOrderSummary,
  // addToCart,
  // updateCartItem,
  // deleteCartItem
} from "../controllers/post-controller";

import {
  getAllTransactions,
  getAlluser,
  transferPoints,
} from "../controllers/point-transaction";

import { updateSupplierStock } from "../controllers/stock-supplier";

const router = express.Router();

router.get("/products", getProducts);
router.post("/product", createProduct);
router.patch("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/cart", getCart);
router.get("/cart/:id", getCartProducts);
router.get("/orders/summary", getOrderSummary);
// router.post("/cart", addToCart);
// router.patch("/cart/:userId/:productId", updateCartItem);
// router.delete("/cart/:userId/:productId", deleteCartItem);

router.get("/transaction", getAllTransactions);
router.get("/users", getAlluser);
router.post("/transfer-points", transferPoints);

router.patch("/suppliers/stock", updateSupplierStock);

export default router;
