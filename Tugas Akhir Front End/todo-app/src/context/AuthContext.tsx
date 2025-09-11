import { createContext } from 'react';

interface User {
    username: string;
    role: 'admin' | 'customer';
}

export interface AuthContextType {
    user: User | null;
    login: (username: string, password?: string) => Promise<void>;
    logout: () => void;
    register: (username: string, password?: string) => Promise<void>; // Tambahkan ini
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);