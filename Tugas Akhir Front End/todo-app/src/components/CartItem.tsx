import React from 'react';
import { useCart } from '../hooks/useCart';
import type { CartItem as TCartItem } from '../types/Cart';
import { formatCurrency } from '../utils/currency';

export const CartItem = ({ item }: { item: TCartItem }) => {
    const { updateQuantity, removeFromCart, loading } = useCart();

    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateQuantity(item.product.id, Number(e.target.value));
    };

    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex-1 flex flex-col">
                <span className="font-medium text-gray-900">{item.product.name}</span>
                <span className="text-sm text-gray-500">{formatCurrency(item.product.price)}</span>
            </div>
            <div className="flex items-center gap-4">
                <select
                    value={item.quantity}
                    onChange={handleQuantityChange}
                    disabled={loading}
                    className="form-select border rounded-md p-1"
                >
                    {[...Array(10)].map((_, i) => (
                        <option key={i} value={i + 1}>
                            {i + 1}
                        </option>
                    ))}
                </select>
                <span className="text-lg font-semibold text-gray-700 w-28 text-right">
                    {formatCurrency(item.product.price * item.quantity)}
                </span>
                <button
                    onClick={() => removeFromCart(item.product.id)}
                    disabled={loading}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                        loading 
                        ? 'bg-red-300 cursor-not-allowed' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};