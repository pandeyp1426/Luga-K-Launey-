
import React from 'react';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { products } = useApp();

  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-gray-900">Curated Elegance</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Discover our exclusive collection of designer apparel, shoes, and accessories.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

