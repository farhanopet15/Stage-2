import { CartProvider } from './context/CartProvider';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import './App.css';

function App() {
    return (
        <CartProvider>
            <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
                    🛍️ NxOne Shop
                </h1>
                <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                        <ProductList />
                    </div>
                    <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                        <Cart />
                    </div>
                </div>
            </div>
        </CartProvider>
    );
}

export default App;