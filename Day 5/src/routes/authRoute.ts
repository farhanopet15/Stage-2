import express from "express";
import { handleRegister, handleLogin } from "../controllers/authController";
import { authenticate, authorize } from "../middlewares/auth";
import { upload } from "../utils/multer";
import limiter from "../middlewares/rate-limiter";

const router = express.Router();

router.post("/register",upload.single("profile"), handleRegister);
router.post("/login", handleLogin);

router.get("/me", limiter,(req, res) => {
    const user = (req as any).user;
    res.json({ message: "Protected route accessed", user });
});

router.get(
    "/admin",
    authenticate,
    authorize(["admin"]),
    (req, res) => {
        res.json({ message: "Welcome to the admin panel!" });
    }
);

export default router;