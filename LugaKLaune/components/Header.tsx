
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Header: React.FC = () => {
  const { user, logout, cart } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold font-serif text-gray-900 tracking-wider">
              Chic Threads
            </Link>
          </div>
          <nav className="hidden md:flex md:space-x-10">
            <Link to="/" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Home</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">Admin</Link>
            )}
          </nav>
          <div className="flex items-center justify-end space-x-6">
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="relative group -m-2 p-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500 group-hover:text-gray-900">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007Z" />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 ml-2 text-xs font-bold text-white bg-gray-800 rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              {user ? (
                <div className="relative group">
                  <Link to="/account" className="flex items-center">
                    <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900">{user.name}</span>
                  </Link>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</Link>
                    <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="text-sm font-medium text-gray-500 hover:text-gray-900">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

