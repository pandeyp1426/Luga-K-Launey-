
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const navItems = [
  { label: 'Categories', hasDropdown: true },
  { label: 'New In' },
  { label: 'Sale' },
  { label: 'Women Clothing' },
  { label: 'Kids' },
  { label: 'Curve' },
  { label: 'Men Clothing' },
  { label: 'Shoes' },
  { label: 'Underwear & Sleepwear' },
  { label: 'Home & Living' },
  { label: 'Jewelry & Accessories' },
  { label: 'Beauty & Health' },
];

const Header: React.FC = () => {
  const { user, logout, cart } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const iconButtonClass =
    'p-2 rounded-full border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-400 transition';
  const searchInputClass =
    'flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 focus:outline-none';

  return (
    <header className="bg-white/85 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-3xl font-bold font-serif text-gray-900 tracking-wider">
                Luga K Launey?
              </Link>
            </div>

            <div className="hidden lg:flex flex-1 items-center">
              <div className="flex w-full max-w-2xl items-center bg-white border border-gray-200 rounded-full shadow-sm overflow-hidden">
                <span className="pl-4 pr-2 text-lg" role="img" aria-label="Trending search">
                  🔥
                </span>
                <input
                  type="text"
                  defaultValue="Sweaters For Women"
                  className={searchInputClass}
                  aria-label="Search catalog"
                />
                <button
                  type="button"
                  className="bg-gray-900 text-white px-5 py-3 h-full flex items-center justify-center hover:bg-gray-700 transition rounded-l-none"
                  aria-label="Search"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path
                      fillRule="evenodd"
                      d="M10 3.5a6.5 6.5 0 1 1 4.065 11.773l3.331 3.331a.75.75 0 1 1-1.06 1.06l-3.332-3.33A6.5 6.5 0 0 1 10 3.5ZM5.5 10a4.5 4.5 0 1 0 9 0 4.5 4.5 0 0 0-9 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              {user ? (
                <div className="relative group hidden sm:block">
                  <button className={`${iconButtonClass} flex items-center gap-2`} aria-label="Account menu">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                    <Link to="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className={`${iconButtonClass} hidden sm:flex items-center gap-2`}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 15 0" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Sign In</span>
                </Link>
              )}

              <Link to="/cart" className={`${iconButtonClass} relative`} aria-label="Cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386a1 1 0 0 1 .98.804l.383 1.917M6 12h12l1.5-6H5.25m.75 6-1.5-6m14.25 6-1.35 5.4a1 1 0 0 1-.97.8H8.07a1 1 0 0 1-.97-.757L5.25 6"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs font-bold text-white bg-gray-900 rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              <button type="button" className={iconButtonClass} aria-label="Wishlist">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 3.75a4.5 4.5 0 0 1 3.364 7.537l-7.364 7.363-7.364-7.363A4.5 4.5 0 1 1 11.25 4.5"
                  />
                </svg>
              </button>

              <button type="button" className={iconButtonClass} aria-label="Assistant">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3h6.75M15.75 21v-2.25A6.75 6.75 0 0 0 9 12h0A6.75 6.75 0 0 0 2.25 18.75V21M21.75 21v-2.25a6.75 6.75 0 0 0-4.5-6.36"
                  />
                </svg>
              </button>

              <button type="button" className={iconButtonClass} aria-label="Change language or region">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c-2.25-2.25-3.938-5.25-4.5-9 3.75-1.5 5.25-3 4.5-4.5m0 13.5c2.25-2.25 3.938-5.25 4.5-9-3.75-1.5-5.25-3-4.5-4.5" />
                </svg>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between gap-4 text-sm font-medium text-gray-600 overflow-x-auto">
              <div className="flex items-center gap-6 whitespace-nowrap">
                <Link to="/" className="hover:text-gray-900 transition-colors">
                  Home
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="hover:text-gray-900 transition-colors">
                    Admin
                  </Link>
                )}
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    className="hover:text-gray-900 transition-colors flex items-center gap-1"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.939l3.71-3.71a.75.75 0 0 1 1.06 1.061l-4.24 4.24a.75.75 0 0 1-1.06 0l-4.24-4.24a.75.75 0 0 1 .02-1.06Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-2 text-gray-400">
                <button type="button" className="p-1 hover:text-gray-600" aria-label="Scroll left">
                  ‹
                </button>
                <button type="button" className="p-1 hover:text-gray-600" aria-label="Scroll right">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

