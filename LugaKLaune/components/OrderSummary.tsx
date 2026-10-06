import { Link } from 'react-router-dom';
import { money, shippingFor, useApp } from '../context/AppContext';
import Icon from './Icon';
export default function OrderSummary({ checkout = false }: { checkout?: boolean }) {
  const { cartTotal, cart } = useApp();
  const shipping = shippingFor(cartTotal);
  return <aside className="order-summary"><h2>{checkout ? 'Your order' : 'The details'}</h2>
    {checkout && <div className="mini-cart">{cart.map(item => <div key={item.lineId}><img src={item.imageUrl} alt="" width="56" height="70"/><div><Link to={`/product/${item.id}`}>{item.name}</Link><p>{item.size} · Qty {item.quantity}</p></div><span>{money(item.price * item.quantity)}</span></div>)}</div>}
    <dl><div><dt>Subtotal</dt><dd>{money(cartTotal)}</dd></div><div><dt>Delivery estimate</dt><dd>{shipping ? money(shipping) : 'Complimentary'}</dd></div><div><dt>Taxes</dt><dd>At live checkout</dd></div><div className="summary-total"><dt>Estimated total</dt><dd>{money(cartTotal + shipping)} <small>USD</small></dd></div></dl>
    {!checkout && <><div className="shipping-progress"><p>{shipping ? `You’re ${money(100 - cartTotal)} from complimentary delivery.` : 'Complimentary delivery included in your preview.'}</p><progress value={Math.min(cartTotal, 100)} max="100" aria-label="Progress toward complimentary delivery"/></div><Link to="/checkout" className="button button-red full-width">Continue to checkout <Icon name="arrow"/></Link></>}
    <p className="summary-note"><Icon name="lock" width="16" height="16"/> Preview only. No payment will be taken.</p>
  </aside>;
}

