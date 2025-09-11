import { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { ProductForm } from './ProductForm';
import type { Product } from '../../types/Cart';
import { formatCurrency } from '../../utils/currency';
import api from '../../utils/api';

interface Order {
    id: number;
    user: { username: string };
    items: { product: Product; quantity: number }[];
    total: number;
    date: string;
}

export const AdminDashboard = () => {
    const { products, deleteProduct, loading } = useProducts();
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get<Order[]>('/orders');
                setOrders(response.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
                alert("Could not fetch orders. You may not have admin privileges.");
            }
        };
        fetchOrders();
    }, []);
    
    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingProduct(null);
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={handleAddNew} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                    Add New Product
                </button>
            </div>

            {isFormOpen && (
                <div className="my-4">
                    <ProductForm productToEdit={editingProduct} onFormClose={handleFormClose} />
                </div>
            )}

            <div className="bg-gray-800 p-4 rounded-lg shadow-md mt-6">
                <h2 className="text-xl font-semibold mb-4 text-white">Manage Products</h2>
                <table className="min-w-full text-white">
                    <thead>
                        <tr className="border-b border-gray-600">
                            <th className="text-left py-2 px-3">Name</th>
                            <th className="text-left py-2 px-3">Price</th>
                            <th className="text-right py-2 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700">
                                <td className="py-2 px-3">{product.name}</td>
                                <td className="py-2 px-3">{formatCurrency(product.price)}</td>
                                <td className="py-2 px-3 text-right">
                                    <button 
                                        onClick={() => handleEdit(product)} 
                                        className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => deleteProduct(product.id)} 
                                        disabled={loading} 
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 disabled:bg-red-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 text-white">Recent Orders</h2>
                <div className="space-y-4">
                    {orders.length > 0 ? (
                        orders.map(order => (
                            <div key={order.id} className="bg-gray-700 p-4 rounded-md">
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold">Order #{order.id} - {order.user.username}</h3>
                                    <span className="text-lg font-bold">{formatCurrency(order.total)}</span>
                                </div>
                                <p className="text-sm text-gray-400">{new Date(order.date).toLocaleString()}</p>
                                <ul className="mt-2 text-sm list-disc list-inside">
                                    {order.items.map(item => (
                                        <li key={item.product.id}>
                                            {item.product.name} (x{item.quantity})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No orders yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};