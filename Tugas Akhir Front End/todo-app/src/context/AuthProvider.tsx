import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import { jwtDecode } from 'jwt-decode';

interface User {
    username: string;
    role: 'admin' | 'customer';
}

const API_URL = 'http://localhost:3001/api/auth';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            try {
                const decoded: User = jwtDecode(token);
                setUser({ username: decoded.username, role: decoded.role });
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token');
                setToken(null);
                setUser(null);
            }
        }
    }, [token]);

    const login = async (username: string, password?: string) => {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const { token: newToken, user: loggedInUser } = response.data;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(loggedInUser);
    };

    const register = async (username: string, password?: string) => {
        await axios.post(`${API_URL}/register`, { username, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};