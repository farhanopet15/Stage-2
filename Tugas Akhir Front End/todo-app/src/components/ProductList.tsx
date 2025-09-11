import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import { formatCurrency } from '../utils/currency';

export const ProductList = () => {
    const { addToCart, loading: cartLoading } = useCart();
    const { products, loading: productsLoading } = useProducts();

    if (productsLoading) {
        return <p>Loading products...</p>
    }

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
                            disabled={cartLoading}
                            className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                                cartLoading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            {cartLoading ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};