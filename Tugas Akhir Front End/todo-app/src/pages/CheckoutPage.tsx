import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { formatCurrency } from '../utils/currency';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

export const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleConfirmOrder = async () => {
        if (!user) {
            alert('You must be logged in to place an order.');
            navigate('/login');
            return;
        }

        const orderData = {
            items: cartItems,
            total,
        };

        try {
            await api.post('/orders', orderData);
            
            alert('Orderan Kamu Telah Kami Terima, Terimakasih!!!');
            await clearCart();
            navigate('/');
        } catch (error) {
            console.error("Gagal Untuk Order:", error);
            alert("Terjadi kesalahan saat memesan. Silakan coba lagi.");
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-3xl font-bold mb-4">Checkout</h1>
                <p className="text-gray-500">Your cart is empty. Nothing to checkout.</p>
                <button onClick={() => navigate('/')} className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md">
                    Back to Store
                </button>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Checkout Summary</h1>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Details</h2>
                {cartItems.map(item => (
                    <div key={item.product.id} className="flex justify-between items-center py-2 border-b text-gray-800">
                        <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-gray-500">{item.quantity} x {formatCurrency(item.product.price)}</p>
                        </div>
                        <p className="font-semibold">{formatCurrency(item.product.price * item.quantity)}</p>
                    </div>
                ))}
                <div className="flex justify-between items-center mt-4 pt-4 font-bold text-xl text-gray-800">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
                 <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>
                 <form className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-600">Full Name</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Nama Lengkap" />
                     </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Address</label>
                        <input type="text" className="w-full px-3 py-2 border rounded-md" placeholder="Jl. Bandung" />
                     </div>
                 </form>
            </div>
            <div className="mt-8 flex justify-end">
                <button onClick={handleConfirmOrder} className="bg-green-500 text-white px-8 py-3 rounded-md text-lg font-bold hover:bg-green-600">
                    Confirm Order
                </button>
            </div>
        </div>
    );
};