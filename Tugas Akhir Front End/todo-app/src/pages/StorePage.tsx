import { ProductList } from '../components/ProductList';
import { Cart } from '../components/Cart';

export const StorePage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-extrabold text-center my-8">Mini Online Store</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <ProductList />
                </div>
                <div>
                    <Cart />
                </div>
            </div>
        </div>
    );
};