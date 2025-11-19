
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

const AccountPage: React.FC = () => {
  const { user, orders } = useApp();
  const [rating, setRating] = useState(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  if (!user) return null;

  const userOrders = orders.filter(o => o.userId === user.id);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Shipped': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
  };

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-serif text-gray-900">My Account</h1>
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold">Profile Information</h2>
          <p className="mt-2"><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold font-serif text-gray-900">Order History</h2>
        <div className="mt-6 space-y-6">
          {userOrders.length > 0 ? userOrders.map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-500">Date: {order.date}</p>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <div className="mt-4 border-t pt-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <p>{item.name} (x{item.quantity})</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="text-right font-bold mt-2">Total: ${order.total.toFixed(2)}</div>
            </div>
          )) : (
            <p className="bg-white p-6 rounded-lg shadow-md">You have no past orders.</p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold font-serif text-gray-900">Rate Your Experience</h2>
        {feedbackSubmitted ? (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-green-600 font-semibold">Thank you for your feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold mb-2">How would you rate your overall experience?</p>
            <div className="flex items-center space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button type="button" key={star} onClick={() => setRating(star)} className="focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            <textarea placeholder="Any additional comments? (optional)" className="w-full border-gray-300 rounded-md shadow-sm" rows={3}></textarea>
            <button type="submit" className="mt-4 bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900">Submit Feedback</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AccountPage;

