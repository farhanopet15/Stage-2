import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService"
import { loginSchema, registerSchema } from "../validation/authValidation";

export async function handleRegister(req : Request, res: Response) {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    if(!req.file){
        res.status(400).json({ message: "no file uploaded" });
        return;
    }

    const { email, password } = req.body;
    const profile = req.file.filename;

    const user = await registerUser(email, password, profile);
    res.status(201).json({ message: "User registered", user });
    } catch (err: any) {
    res.status(400).json ({ message: err.message });
    }
}

export async function handleLogin(req: Request, res: Response) {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            res.status(400).json({ message: error.message });
        return;
    } 
    
    const { email, password } = req.body;

    const result = await loginUser(email, password);
    res.json({message: "Login Success", ...result});
    }   catch (err: any) {
        res.status(401).json ({ message: err.message });
    }
}