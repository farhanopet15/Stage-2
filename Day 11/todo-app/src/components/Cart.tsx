import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { formatCurrency } from '../utils/currency';

export const Cart = () => {
    const { cartItems, loading } = useCart();
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="cart">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
            {loading && (
                <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="ml-4 text-gray-600">Updating...</p>
                </div>
            )}
            {!loading && cartItems.length === 0 ? (
                <p className="text-gray-500 italic">Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <CartItem key={item.product.id} item={item} />
                    ))}
                    <div className="mt-8 pt-4 border-t-4 border-gray-400 flex justify-between items-center">
                        <span className="text-xl font-bold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-blue-600">{formatCurrency(total)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};