import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'default-secret';

export const generateToken = (payload: object) => {
    return jwt.sign(payload, secret, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};