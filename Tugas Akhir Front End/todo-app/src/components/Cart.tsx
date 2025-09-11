import { useCart } from '../hooks/useCart';
import { CartItem } from './CartItem';
import { formatCurrency } from '../utils/currency';
import { Link } from 'react-router-dom';

export const Cart = () => {
    const { cartItems, loading } = useCart();
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="cart bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Shopping Cart</h2>
            {!loading && cartItems.length === 0 ? (
                <p className="text-gray-500 italic">Your cart is empty.</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <CartItem key={item.product.id} item={item} />
                        ))}
                    </div>
                    <div className="mt-8 pt-4 border-t-2 border-gray-200">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-xl font-bold text-gray-900">Total:</span>
                            <span className="text-xl font-bold text-blue-600">{formatCurrency(total)}</span>
                        </div>
                        <Link
                            to="/checkout"
                            className="block w-full text-center bg-green-500 text-white py-3 rounded-md font-bold hover:bg-green-600"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};