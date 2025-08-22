import { Request, Response } from "express";
import { prisma } from "../connection/client";


export const getPosts = async (req: Request, res: Response) => {
    const { category } = req.query;

    const where: any = {};
    if (category) {
        where.category = {
            equals: category as string,
            mode: "insensitive",
        };
    }

    try {
        const posts = await prisma.post.findMany({ where });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching posts." });
    }
};


export const createPost = async (req: Request, res: Response) => {
    const { title, content, category } = req.body;
    try {
        const post = await prisma.post.create({
            data: { title, content, category },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the post." });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, content, category } = req.body;
    try {
        const post = await prisma.post.update({
            where: { id: parseInt(id) },
            data: { title, content, category },
        });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the post." });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({
            where: { id: parseInt(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "An error occurred while deleting the post." });
    }
};

//pagination
export const getPostComments = async (req: Request, res: Response) => {
    try {
        // 1. Ambil 'id' dari parameter URL
        const { id } = req.params;

        // 2. Konversi 'id' dari string ke integer
        const postId = parseInt(id, 10);

        // Validasi jika postId bukan angka
        if (isNaN(postId)) {
            return res.status(400).json({ error: "Post ID must be a number." });
        }

        // 3. Cari komentar berdasarkan postId
        const comments = await prisma.comment.findMany({
            where: {
                postId: postId,
            },
        });

        // 4. Kirim response
        res.status(200).json(comments);

    } catch (error) {
        // Jika terjadi error, kirim response 500
        console.error(error); // Log error untuk debugging
        res.status(500).json({ error: "An error occurred while fetching the comment." });
    }
};

//pagination dan filtering
export const getCommentsSummary = async (req: Request, res: Response) => {
    try {
        const postsWithCommentsCount = await prisma.post.count({
            where: {
                comment: {
                    some: {}
                }
            },
        });

        res.status(200).json({
            postsWithComments: postsWithCommentsCount,
        });
    } catch (error) {
        res.status(500).json({ error: "An error occurred while fetching the comments summary." });
    }
};