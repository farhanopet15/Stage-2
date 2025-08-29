import express from "express";
import { authenticate } from "../middlewares/auth";
import { handleSupplierLogin, handleAddProduct, getSupplierProducts } from "../controllers/supplierController";
import { authorizeProductUpdate } from "../middlewares/authorization";

const router = express.Router();

router.post("/login", handleSupplierLogin);
router.get("/products", authenticate, getSupplierProducts);
router.post("/products/add", authenticate, handleAddProduct);
router.put("/products/:productId", authenticate, authorizeProductUpdate(), (req, res) => {
    res.json({ message: "Product updated successfully" });
});

export default router;