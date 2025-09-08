import { createContext } from 'react';
import type { CartItem, Product } from '../types/Cart';

export interface CartContextType {
    cartItems: CartItem[];
    loading: boolean;
    addToCart: (product: Product) => Promise<void>;
    updateQuantity: (productId: number, newQuantity: number) => Promise<void>;
    removeFromCart: (productId: number) => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);