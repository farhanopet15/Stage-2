import { Request, Response } from "express";
import { prisma } from "../connection/client";

export const createUser = async (req: Request, res: Response) => {
    const { email, name } = req.body;
    try {
        const user = await prisma.user.create({
            data: { email, name },
        });
        res.status(201).json({ data: user });
    } catch (err) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            include: { posts: true }
        });
        res.status(200).json({ data: users });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const getUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: { id },
            include: { posts: true }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { email, name } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id },
            data: { email, name },
        });
        res.status(200).json({ data: user });
    } catch (err) {
        res.status(500).json({ error: "Failed to update user" });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await prisma.user.delete({
            where: { id },
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: "Failed to delete user" });
    }
};