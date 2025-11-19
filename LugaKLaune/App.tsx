
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import FashionAssistant from './components/FashionAssistant';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  return user?.role === 'admin' ? <>{children}</> : <Navigate to="/" />;
};

const AppContent: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f8f7] text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
          <Route path="/account" element={<PrivateRoute><AccountPage /></PrivateRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <FashionAssistant />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;

