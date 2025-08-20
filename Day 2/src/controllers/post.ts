import { Request, Response } from "express";
import { prisma } from "../connection/client";


export const createPost = async (req: Request, res: Response) => {
    const { title, content, authorId } = req.body;
    try {
        const post = await prisma.post.create({
            data: { title, content, authorId },
        });
        res.status(201).json({ data: post });
    } catch (err) {
        res.status(500).json({ error: "Failed to create post" });
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true }
        });
        res.status(200).json({ data: posts });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};

export const getPost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: { author: true }
        });
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ data: post });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch post" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { title, content, published, authorId } = req.body;
    try {
        const post = await prisma.post.update({
            where: { id },
            data: { title, content, published, authorId },
        });
        res.status(200).json({ data: post });
    } catch (err) {
        res.status(500).json({ error: "Failed to update post" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.post.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Failed to delete post" });
    }
};