
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();

  return (
    <div className="group relative flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-serif font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
          <p className="mt-4 text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

