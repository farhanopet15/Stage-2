import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid Token" });
    }
}

export function authorize(allowedRoles: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (!user || !allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
        }

        next();
    };
}