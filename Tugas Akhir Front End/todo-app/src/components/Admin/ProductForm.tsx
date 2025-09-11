import React, { useState, useEffect } from 'react';
import { useProducts } from '../../hooks/useProducts';
import type { Product } from '../../types/Cart';

interface ProductFormProps {
    productToEdit?: Product | null;
    onFormClose: () => void;
}

export const ProductForm = ({ productToEdit, onFormClose }: ProductFormProps) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const { addProduct, updateProduct, loading } = useProducts();

    useEffect(() => {
        if (productToEdit) {
            setName(productToEdit.name);
            setPrice(productToEdit.price.toString());
        } else {
            setName('');
            setPrice('');
        }
    }, [productToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const productData = { name, price: Number(price) };

        if (productToEdit) {
            await updateProduct({ ...productData, id: productToEdit.id });
        } else {
            await addProduct(productData);
        }
        onFormClose();
    };

    return (
        <div className="p-6 bg-gray-50 border rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">{productToEdit ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="flex justify-end gap-4">
                     <button type="button" onClick={onFormClose} className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400">
                        Cancel
                    </button>
                    <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300">
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};