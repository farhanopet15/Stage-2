import { useCart } from '../hooks/useCart';
import type { Product } from '../types/Cart';
import { formatCurrency } from '../utils/currency';

const products: Product[] = [
    { id: 1, name: 'Apple MacBook Pro', price: 1500000 },
    { id: 2, name: 'Logitech MX Master', price: 250000 },
    { id: 3, name: 'Mechanical Keyboard', price: 150000 },
];

export const ProductList = () => {
    const { addToCart, loading } = useCart();

    return (
        <div className="product-list">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>
            <div className="grid gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-lg border border-gray-200 flex justify-between items-center">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-sm text-gray-600">{formatCurrency(product.price)}</p>
                        </div>
                        <button
                            onClick={() => addToCart(product)}
                            disabled={loading}
                            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                                loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {loading ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};