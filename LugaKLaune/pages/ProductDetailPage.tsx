
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="mt-4 inline-block text-gray-800 hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold font-serif text-gray-900">{product.name}</h1>
          <p className="text-gray-500 text-lg mt-2">{product.category}</p>
          <p className="text-3xl font-semibold text-gray-900 my-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
          <div className="mt-auto">
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-gray-800 text-white py-3 px-6 rounded-md text-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

