import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_RESET_SECRET = process.env.JWT_RESET_SECRET as string;

export interface UserPayload {
    id: number;
    role: string;
}

export function signToken(payload: UserPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET) as UserPayload;
}

export function signPasswordResetToken(payload: { id: number }) {
    return jwt.sign(payload, JWT_RESET_SECRET, { expiresIn: "15m" });
}

export function verifyPasswordResetToken(token: string) {
    return jwt.verify(token, JWT_RESET_SECRET) as { id: number };
}