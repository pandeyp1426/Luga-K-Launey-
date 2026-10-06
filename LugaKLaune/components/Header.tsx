import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Icon from './Icon';
export default function Header() {
  const { cart, wishlist, user } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const focusResults = useRef(false);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); if (focusResults.current) { document.getElementById('main')?.focus({ preventScroll: true }); window.scrollTo(0, 0); focusResults.current = false; } }, [location]);
  const count = cart.reduce((n, i) => n + i.quantity, 0);
  const navigation = <><Link to="/shop?edit=new">New in</Link><Link to="/shop?audience=Women">Women</Link><Link to="/shop?audience=Men">Men</Link><Link to="/shop?category=Accessories">Accessories</Link><Link to="/about">The Hima edit</Link><Link className="sale-link" to="/shop?edit=sale">Last chance</Link></>;
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className="announcement"><span>A fresh perspective on everyday style.</span><Link to="/shop?edit=new">Meet your new favorites <Icon name="arrow" width="15" height="15"/></Link></div>
    <header className="site-header">
      <div className="header-main shell">
        <button ref={menuTrigger} className="icon-button mobile-menu" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}><Icon name={menuOpen ? 'close' : 'menu'}/></button>
        <Link to="/" className="wordmark" aria-label="Hima home">hima<span>Â®</span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{navigation}</nav>
        <div className="header-actions">
          <button ref={searchTrigger} className="icon-button" aria-label={searchOpen ? 'Close search' : 'Search products'} aria-expanded={searchOpen} aria-controls="site-search" onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}><Icon name={searchOpen ? 'close' : 'search'}/></button>
          <Link className="icon-button account-link" to={user ? '/account' : '/login'} aria-label="My account"><Icon name="user"/></Link>
          <Link className="icon-button wishlist-link" to="/wishlist" aria-label={`Saved items (${wishlist.length})`}><Icon name="heart"/>{wishlist.length > 0 && <span className="small-count">{wishlist.length}</span>}</Link>
          <Link className="bag-link" to="/cart" aria-label={`Shopping bag (${count} items)`}><Icon name="bag"/><span className="bag-label">Bag</span><span className="bag-count">{count}</span></Link>
        </div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav shell" aria-label="Mobile navigation" onKeyDown={e => { if (e.key === 'Escape') { setMenuOpen(false); menuTrigger.current?.focus(); } }}>{navigation}<Link to="/wishlist">Saved pieces ({wishlist.length})</Link><Link to={user ? '/account' : '/login'}>My account</Link></nav>}
      {searchOpen && <form id="site-search" className="search-panel shell" role="search" onSubmit={e => { e.preventDefault(); focusResults.current = true; navigate(`/shop?q=${encodeURIComponent(query.trim())}`); }} onKeyDown={e => { if (e.key === 'Escape') { setSearchOpen(false); searchTrigger.current?.focus(); } }}>
        <label className="sr-only" htmlFor="header-search">Search Hima</label><Icon name="search"/><input id="header-search" autoFocus placeholder="Find your next favorite. Try â€œblazerâ€ or â€œdenimâ€." value={query} onChange={e => setQuery(e.target.value)} maxLength={100}/><button className="text-link" type="submit">Search <Icon name="arrow"/></button>
      </form>}
    </header>
  </>;
}
