import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from '../prisma';
import { generateToken } from '../utils/jwt';
import { Role } from '@prisma/client';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, name, password, role } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const userRole = role && Object.values(Role).includes(role) ? role : Role.USER;

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: userRole
            },
        });

        res.status(201).json({ message: 'User registered successfully', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ id: user.id, role: user.role });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};