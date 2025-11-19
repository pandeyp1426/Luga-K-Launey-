
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, clearCart } = useApp();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simulation. In a real app, you'd process payment here.
    console.log("Simulating order placement...");
    setIsOrderPlaced(true);
    clearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className="text-center py-20 bg-white rounded-lg shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-3xl font-bold font-serif text-gray-900 mt-4">Thank You for Your Order!</h1>
        <p className="mt-2 text-gray-600">Your order has been placed successfully. You can track its status in your account.</p>
        <Link
          to="/account"
          className="mt-6 inline-block bg-gray-800 text-white py-2 px-6 rounded-md hover:bg-gray-900 transition-colors"
        >
          View My Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">Shipping & Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" id="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Shipping Information</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <input type="text" placeholder="First name" className="block w-full border-gray-300 rounded-md shadow-sm" required />
                <input type="text" placeholder="Last name" className="block w-full border-gray-300 rounded-md shadow-sm" required />
                <div className="sm:col-span-2">
                  <input type="text" placeholder="Address" className="block w-full border-gray-300 rounded-md shadow-sm" required />
                </div>
                <input type="text" placeholder="City" className="block w-full border-gray-300 rounded-md shadow-sm" required />
                <input type="text" placeholder="State / Province" className="block w-full border-gray-300 rounded-md shadow-sm" required />
                <input type="text" placeholder="ZIP / Postal code" className="block w-full border-gray-300 rounded-md shadow-sm" required />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Payment Details (Simulation)</h3>
              <div className="mt-4 grid grid-cols-1 gap-y-6">
                <input type="text" placeholder="Card number" className="block w-full border-gray-300 rounded-md shadow-sm" defaultValue="**** **** **** 4242" />
                <input type="text" placeholder="Name on card" className="block w-full border-gray-300 rounded-md shadow-sm" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Expiration date (MM/YY)" className="block w-full border-gray-300 rounded-md shadow-sm" />
                  <input type="text" placeholder="CVC" className="block w-full border-gray-300 rounded-md shadow-sm" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="mt-8 w-full bg-gray-800 text-white py-3 px-6 rounded-md text-lg hover:bg-gray-900 transition-colors">
            Place Order
          </button>
        </form>
      </div>
      <div className="bg-gray-50 rounded-lg shadow-inner p-8">
        <h2 className="text-2xl font-bold font-serif text-gray-900 mb-6">Order Summary</h2>
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t border-gray-200 pt-6 space-y-2">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${cartTotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping (est.)</p>
            <p>$15.00</p>
          </div>
          <div className="flex justify-between">
            <p>Taxes (est.)</p>
            <p>${(cartTotal * 0.08).toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-lg font-bold mt-4 border-t border-gray-200 pt-4">
            <p>Total</p>
            <p>${(cartTotal + 15 + cartTotal * 0.08).toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

