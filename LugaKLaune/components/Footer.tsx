import { Link } from 'react-router-dom';
import Icon from './Icon';
export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-intro shell"><p>Find something that feels like you.</p><Link to="/shop" className="text-link">Explore Hima <Icon name="arrow"/></Link></div>
    <div className="footer-main shell">
      <div className="footer-brand"><Link to="/" className="wordmark" aria-label="Hima home">hima<span>®</span></Link><p>A fresh perspective on everyday style.<br/>Individual by nature.</p></div>
      <div><h2>Explore</h2><Link to="/shop?edit=new">New arrivals</Link><Link to="/shop?audience=Women">Women</Link><Link to="/shop?audience=Men">Men</Link><Link to="/shop?category=Accessories">Accessories</Link></div>
      <div><h2>Here to help</h2><Link to="/help?topic=shipping">Delivery & returns</Link><Link to="/help?topic=sizing">Size guide</Link><Link to="/account">My orders</Link><Link to="/help">Shopping help</Link></div>
      <div><h2>About Hima</h2><Link to="/about">Our perspective</Link><Link to="/wishlist">Your saved pieces</Link><Link to="/help?topic=privacy">Privacy</Link><span className="region-label">United States · USD $</span></div>
    </div>
    <div className="footer-bottom shell"><span>© {new Date().getFullYear()} Hima</span><span>Storefront preview. Products and prices are illustrative; no purchases or payments are processed.</span><Link to="/login">Preview account</Link></div>
  </footer>;
}

