import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { money, useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import ProductCard from '../components/ProductCard';
export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart, wishlist, toggleWishlist, cart } = useApp();
  const product = products.find(p => p.id === id);
  const [size, setSize] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  useEffect(() => { setSize(product?.sizes.length === 1 ? product.sizes[0] : ''); setError(''); setAdded(false); }, [id, product?.sizes]);
  if (!product) return <div className="empty-state shell"><h1>This piece couldn’t be found.</h1><p>There’s still plenty to discover.</p><Link to="/shop" className="button button-dark">Back to the collection</Link></div>;
  const saved = wishlist.includes(product.id);
  const inBag = cart.filter(i => i.id === id).reduce((n, i) => n + i.quantity, 0);
  const unavailable = product.stock <= inBag;
  return <div className="shell product-page"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to={`/shop?category=${product.category}`}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
    <div className="product-detail-grid"><div className="detail-image"><img src={product.imageUrl} alt={product.imageAlt} width="700" height="875"/>{product.tag && <span className="product-tag">{product.tag}</span>}</div>
      <div className="detail-content"><p className="eyebrow">HIMA / THE EVERYDAY COLLECTION</p><h1>{product.name}</h1><div className="detail-price">{money(product.price)} {product.originalPrice && <del>{money(product.originalPrice)}</del>}<span>USD</span></div><p className="detail-description">{product.description}</p>
        <div className="color-selection"><span>Color: <strong>{product.color}</strong></span><span className="swatch" style={{ background: product.swatch }}/></div>
        <fieldset className="size-fieldset" aria-describedby={error ? 'size-error' : undefined}><legend>Select size <Link to="/help?topic=sizing">Size guide</Link></legend><div className="size-options">{product.sizes.map(s => <label className={size === s ? 'selected' : ''} key={s}><input type="radio" name="size" value={s} checked={size === s} onChange={() => { setSize(s); setError(''); setAdded(false); }}/><span>{s}</span></label>)}</div></fieldset>
        {error && <p className="field-error" id="size-error" role="alert">{error}</p>}
        <div className="add-actions"><button className="button button-red full-width" disabled={unavailable} onClick={() => { if (!size) { setError('Choose a size to add this piece to your bag.'); return; } setAdded(addToCart(product, size)); }}>{unavailable ? product.stock === 0 ? 'Sold out' : 'All available pieces in your bag' : added ? 'Added to your bag' : 'Add to bag'}<Icon name={added ? 'check' : 'bag'}/></button><button className={`detail-save ${saved ? 'is-saved' : ''}`} aria-label={saved ? 'Remove from saved pieces' : 'Save this piece'} aria-pressed={saved} onClick={() => toggleWishlist(product.id)}><Icon name="heart" fill={saved ? 'currentColor' : 'none'}/></button></div>
        {added && <Link className="text-link view-bag-link" to="/cart">View your bag <Icon name="arrow"/></Link>}
        <p className="product-note">Illustrative product in the Hima storefront preview.</p>
        <div className="detail-accordions"><details open><summary>Details & care <Icon name="plus" width="18" height="18"/></summary><p>{product.material}</p></details><details><summary>Fit notes <Icon name="plus" width="18" height="18"/></summary><p>{product.category === 'Clothing' ? 'Designed with an easy, everyday fit. Use the size guide to compare measurements before choosing your size.' : product.category === 'Shoes' ? 'Sizes are shown in US sizing. Check the size guide for approximate foot lengths.' : 'An easy finishing touch, available in one size.'}</p></details><details><summary>Delivery & returns <Icon name="plus" width="18" height="18"/></summary><p>This is a shopping preview. No items are dispatched. <Link to="/help?topic=shipping" className="inline-link">See delivery information.</Link></p></details></div>
      </div>
    </div>
    <section className="section related-section"><div className="section-heading"><div><p className="eyebrow">BETTER TOGETHER</p><h2>Complete your everyday.</h2></div><Link to="/shop" className="text-link">Explore more <Icon name="arrow"/></Link></div><div className="product-grid">{products.filter(p => p.id !== id).slice(0,4).map(p => <ProductCard key={p.id} product={p}/>)}</div></section>
  </div>;
}

