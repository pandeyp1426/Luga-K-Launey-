import { Link } from 'react-router-dom';
import { money, useApp } from '../context/AppContext';
import Icon from '../components/Icon';
import OrderSummary from '../components/OrderSummary';
export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, products } = useApp();
  const count = cart.reduce((n,i) => n + i.quantity, 0);
  if (!cart.length) return <div className="empty-state shell"><Icon name="bag" width="48" height="48"/><p className="eyebrow">ROOM FOR SOMETHING GOOD</p><h1>Your bag is waiting.</h1><p>Let’s find a few pieces that feel like you.</p><Link to="/shop" className="button button-red">Explore the collection <Icon name="arrow"/></Link><Link className="text-link" to="/wishlist">See your saved pieces</Link></div>;
  return <div className="shell page-spacing"><div className="section-heading"><div><p className="eyebrow">GOOD CHOICES, ALL TOGETHER</p><h1 className="page-title">Your bag. <span className="title-count">({count})</span></h1></div><Link to="/shop" className="text-link">Keep exploring <Icon name="arrow"/></Link></div>
    <div className="cart-layout"><div className="cart-items">{cart.map(item => {
      const stock = products.find(p => p.id === item.id)?.stock || 0;
      const totalQuantity = cart.filter(i => i.id === item.id).reduce((n,i) => n + i.quantity, 0);
      return <article className="cart-item" key={item.lineId}><Link to={`/product/${item.id}`} className="cart-image"><img src={item.imageUrl} alt={item.imageAlt} width="120" height="150"/></Link><div className="cart-item-info"><h2><Link to={`/product/${item.id}`}>{item.name}</Link></h2><p>{item.color} <span> / </span> {item.size}</p><p>{money(item.price)} each</p><div className="cart-item-controls"><div className="quantity-control"><button disabled={item.quantity <= 1} aria-label={`Decrease quantity of ${item.name}, ${item.size}`} onClick={() => updateQuantity(item.lineId, item.quantity - 1)}><Icon name="minus" width="16" height="16"/></button><span aria-label={`Quantity ${item.quantity}`}>{item.quantity}</span><button disabled={totalQuantity >= stock} aria-label={`Increase quantity of ${item.name}, ${item.size}`} onClick={() => updateQuantity(item.lineId, item.quantity + 1)}><Icon name="plus" width="16" height="16"/></button></div><button className="underlined-button" onClick={() => removeFromCart(item.lineId)} aria-label={`Remove ${item.name}, ${item.size} from bag`}>Remove</button></div></div><p className="cart-line-total">{money(item.price * item.quantity)}</p></article>;
    })}</div><OrderSummary/></div>
  </div>;
}

