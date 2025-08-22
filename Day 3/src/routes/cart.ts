import { Router } from "express";
import { getProduct } from "../controllers/product";

const router = Router();

router.get("/products", getProduct);

export default router;