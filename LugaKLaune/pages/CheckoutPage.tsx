import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { money, useApp } from '../context/AppContext';
import { Order } from '../types';
import Icon from '../components/Icon';
import OrderSummary from '../components/OrderSummary';
export default function CheckoutPage() {
  const { cart, placeOrder } = useApp();
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState('');
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fields = [
    { name: 'email', label: 'Email address', type: 'email', auto: 'email', full: true },
    { name: 'firstName', label: 'First name', auto: 'given-name' },
    { name: 'lastName', label: 'Last name', auto: 'family-name' },
    { name: 'address', label: 'Street address', auto: 'street-address', full: true },
    { name: 'city', label: 'City', auto: 'address-level2' },
    { name: 'state', label: 'State', auto: 'address-level1' },
    { name: 'zip', label: 'ZIP code', auto: 'postal-code' },
  ];
  if (order) return <div className="empty-state shell confirmation"><span className="confirmation-icon"><Icon name="check" width="32" height="32"/></span><p className="eyebrow">LOOKING GOOD</p><h1>Your preview is complete.</h1><p>No payment was taken and no items will be shipped.<br/>Your sample order is ready to view in this session.</p><div className="confirmation-order"><span>{order.id}</span><strong>{money(order.total)} estimated</strong></div><Link className="button button-red" to="/account">View preview orders <Icon name="arrow"/></Link><Link className="text-link" to="/shop">Keep exploring</Link></div>;
  if (!cart.length) return <div className="empty-state shell"><Icon name="bag" width="45" height="45"/><h1>Your bag is empty.</h1><p>Add a piece before continuing to checkout.</p><Link to="/shop" className="button button-red">Explore the collection</Link></div>;
  return <div className="shell page-spacing"><nav className="breadcrumbs" aria-label="Checkout progress"><Link to="/cart">Bag</Link><span>/</span><span aria-current="step">Checkout</span><span>/</span><span>Confirmation</span></nav><h1 className="page-title">Almost yours.</h1><div className="preview-notice"><Icon name="sparkle"/><p><strong>You’re exploring a preview.</strong> Use sample details to try checkout. No payment is collected and no order is sent.</p></div>
    <div className="cart-layout checkout-layout"><form ref={formRef} className="checkout-form" onSubmit={e => { e.preventDefault(); if (submitting.current) return; submitting.current = true; const placed = placeOrder(); if (placed) { setOrder(placed); window.scrollTo(0,0); } else { setError('Your bag changed. Please review it before trying again.'); submitting.current = false; } }}>
      <div className="form-section-heading"><h2>Delivery details</h2><button className="underlined-button" type="button" onClick={() => { const sample: Record<string,string> = { email: 'guest@example.com', firstName: 'Hima', lastName: 'Guest', address: '123 Sample Street', city: 'Chicago', state: 'Illinois', zip: '60601' }; for (const [name,value] of Object.entries(sample)) { const field = formRef.current?.elements.namedItem(name); if (field instanceof HTMLInputElement) field.value = value; } }}>Use sample details</button></div>
      <div className="form-grid">{fields.map(f => <label key={f.name} className={f.full ? 'span-two' : ''} htmlFor={f.name}>{f.label}<input id={f.name} name={f.name} type={f.type || 'text'} autoComplete={f.auto} required maxLength={f.name === 'zip' ? 10 : 120}/></label>)}<label htmlFor="country">Country<select id="country" name="country" autoComplete="country-name"><option>United States</option></select></label></div>
      <div className="payment-preview"><Icon name="lock"/><div><h2>Payment preview</h2><p>No card details needed. You won’t be charged.</p></div><span>$0 due</span></div>
      {error && <p className="field-error" role="alert">{error} <Link to="/cart" className="inline-link">Review bag</Link></p>}
      <button className="button button-red full-width" type="submit">Place preview order <Icon name="arrow"/></button><p className="form-footnote">Sample delivery details are not saved or sent.</p>
    </form><OrderSummary checkout/></div>
  </div>;
}

