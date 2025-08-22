import express from "express";
import { createPost, getPosts, updatePost, deletePost, getPostComments, getCommentsSummary } from "../controllers/post";

const router = express.Router();

router.post("/post", createPost);
router.get("/posts", getPosts);
router.put("/post/:id", updatePost);
router.delete("/post/:id", deletePost);
router.get("/posts/:id/comments", getPostComments);
router.get("/posts/comments-summary", getCommentsSummary);

export default router;