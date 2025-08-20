import express from "express";
import { createUser, getUsers, getUser, updateUser, deleteUser } from "../controllers/user";

const router = express.Router();

router.post("/user", createUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;