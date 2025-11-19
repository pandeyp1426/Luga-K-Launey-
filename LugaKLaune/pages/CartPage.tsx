
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CartItem } from '../types';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold font-serif text-gray-900">Your Cart is Empty</h1>
        <p className="mt-4 text-gray-600">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="mt-6 inline-block bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-8">Shopping Cart</h1>
      <div className="space-y-6">
        {cart.map((item: CartItem) => (
          <div key={item.id} className="flex items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center space-x-4">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-700 mt-1">Remove</button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-16 text-center border border-gray-300 rounded-md"
                aria-label={`Quantity for ${item.name}`}
              />
              <p className="text-lg font-semibold text-gray-800 w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col items-end">
        <div className="text-right">
          <p className="text-lg text-gray-600">Subtotal</p>
          <p className="text-3xl font-bold text-gray-900">${cartTotal.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-1">Taxes and shipping calculated at checkout.</p>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full sm:w-auto bg-gray-800 text-white py-3 px-8 rounded-md text-lg hover:bg-gray-900 transition-colors"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;

