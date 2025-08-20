import express from "express";
import { createPost, getPosts, updatePost, deletePost } from "../controllers/post";

const router = express.Router();

router.post("/post", createPost);
router.get("/posts", getPosts);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;