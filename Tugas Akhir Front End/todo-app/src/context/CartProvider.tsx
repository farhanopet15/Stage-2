import React, { useState } from 'react';
import { CartContext } from './CartContext';
import type { Product, CartItem } from '../types/Cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);

    const simulateApiCall = async (action: () => void) => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        action();
        setLoading(false);
    };

    const addToCart = async (product: Product) => {
        const existingItem = cartItems.find(item => item.product.id === product.id);
        const prevCart = [...cartItems];

        if (existingItem) {
            setCartItems(cartItems.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { product, quantity: 1 }]);
        }

        try {
            await simulateApiCall(() => {});
        } catch (error) {
            setCartItems(prevCart);
            console.error("Gagal menambahkan produk ke keranjang", error);
        }
    };

    const updateQuantity = async (productId: number, newQuantity: number) => {
        const prevCart = [...cartItems];

        setCartItems(cartItems.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item));

        try {
            await simulateApiCall(() => {});
        } catch (error) {
            setCartItems(prevCart);
            console.error("Gagal memperbarui kuantitas", error);
        }
    };

    const removeFromCart = async (productId: number) => {
        const prevCart = [...cartItems];

        setCartItems(cartItems.filter(item => item.product.id !== productId));

        try {
            await simulateApiCall(() => {});
        } catch (error) {
            setCartItems(prevCart);
            console.error("Gagal menghapus produk dari keranjang", error);
        }
    };

    const clearCart = async () => {
        await simulateApiCall(() => {
            setCartItems([]);
        });
    };

    return (
        <CartContext.Provider value={{ cartItems, loading, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};