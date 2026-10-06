import { Link } from 'react-router-dom';
import { Product } from '../types';
import { money, useApp } from '../context/AppContext';
import Icon from './Icon';
export default function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useApp();
  const saved = wishlist.includes(product.id);
  return <article className="product-card">
    <div className="product-image-wrap">
      <Link to={`/product/${product.id}`} className="product-image-link" aria-label={`View ${product.name}`}><img src={product.imageUrl} alt={product.imageAlt} loading="lazy" width="600" height="750"/></Link>
      {product.tag && <span className="product-tag">{product.tag}</span>}
      <button className={`save-button ${saved ? 'is-saved' : ''}`} aria-label={`${saved ? 'Unsave' : 'Save'} ${product.name}`} aria-pressed={saved} onClick={() => toggleWishlist(product.id)}><Icon name="heart" fill={saved ? 'currentColor' : 'none'} width="19" height="19"/></button>
      <Link className="quick-shop" to={`/product/${product.id}`}>Choose your size <Icon name="plus" width="17" height="17"/></Link>
    </div>
    <div className="product-info"><div className="product-title-line"><h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3><span className="product-price">{money(product.price)}{product.originalPrice && <del>{money(product.originalPrice)}</del>}</span></div>
      <div className="product-meta"><span>{product.color}</span><span className="swatch" style={{ background: product.swatch }} aria-label={product.color}/></div>
    </div>
  </article>;
}

