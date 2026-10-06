import { useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';
import FashionAssistant from './components/FashionAssistant';
import Icon from './components/Icon';
function AppContent() {
  const location = useLocation();
  const { notice, products } = useApp();
  useEffect(() => {
    const titles: Record<string,string> = { '/': 'A little more you.', '/shop': 'The collection', '/wishlist': 'Your saved pieces', '/cart': 'Your bag', '/checkout': 'Checkout preview', '/login': 'Your Hima', '/account': 'Your account', '/admin': 'Hima Studio', '/about': 'Our perspective', '/help': 'Shopping help' };
    const product = products.find(p => location.pathname === `/product/${p.id}`);
    document.title = `${product?.name || titles[location.pathname] || 'Page not found'} — Hima`;
  }, [location.pathname, products]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [location.pathname]);
  return <div className="app"><Header/><main id="main" className="site-main" tabIndex={-1}><Routes>
    <Route path="/" element={<HomePage/>}/><Route path="/shop" element={<ShopPage/>}/><Route path="/wishlist" element={<ShopPage saved/>}/><Route path="/product/:id" element={<ProductDetailPage/>}/><Route path="/cart" element={<CartPage/>}/><Route path="/checkout" element={<CheckoutPage/>}/><Route path="/login" element={<LoginPage/>}/><Route path="/account" element={<AccountPage/>}/><Route path="/admin" element={<AdminPage/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/help" element={<HelpPage/>}/>
    <Route path="*" element={<div className="empty-state shell"><p className="eyebrow">A LITTLE DETOUR</p><h1>Let’s get you back to Hima.</h1><p>We couldn’t find this page.</p><Link className="button button-red" to="/shop">Explore the collection <Icon name="arrow"/></Link></div>}/>
    </Routes></main><FashionAssistant/><Footer/><div className={notice ? 'toast' : 'sr-only'} role="status" aria-live="polite">{notice && <><Icon name="check" width="19" height="19"/><span>{notice}</span><Link to="/cart">View bag</Link></>}</div></div>;
}
export default function App() { return <AppProvider><AppContent/></AppProvider>; }
