import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (productId) {
      fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then((data: Product) => {
          setProduct(data);
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center text-red-500">Product not found!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto border rounded-lg p-6 bg-white shadow-lg">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.title} className="w-full h-auto rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-xl text-gray-700 font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-500 mb-4 capitalize">Category: {product.category}</p>
          <p className="text-base text-gray-800">{product.description}</p>
        </div>
      </div>
    </div>
  );
}