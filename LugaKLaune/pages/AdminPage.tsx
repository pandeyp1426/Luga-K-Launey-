import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Product, Order } from '../types';
import { money, useApp } from '../context/AppContext';
import Icon from '../components/Icon';
function InventoryRow({ product }: { product: Product }) {
  const { updateProduct } = useApp();
  const [price, setPrice] = useState(String(product.price));
  const [stock, setStock] = useState(String(product.stock));
  return <form className="inventory-row" onSubmit={e => { e.preventDefault(); updateProduct({ ...product, price: Number(price), stock: Number(stock) }); }}><img src={product.imageUrl} alt="" width="50" height="64"/><span>{product.name}</span><label>Price (USD)<input type="number" required min="0.01" step="0.01" value={price} onChange={e => setPrice(e.target.value)} aria-label={`Price for ${product.name}`}/></label><label>Stock<input type="number" required min="0" step="1" value={stock} onChange={e => setStock(e.target.value)} aria-label={`Stock for ${product.name}`}/></label><button className="button button-outline" type="submit">Save</button></form>;
}
export default function AdminPage() {
  const { user, products, orders, updateOrderStatus } = useApp();
  const [tab, setTab] = useState('inventory');
  if (user?.role !== 'admin') return <Navigate to="/login" replace/>;
  return <div className="shell page-spacing"><p className="eyebrow">HIMA STUDIO</p><h1 className="page-title">A look behind the collection.</h1><div className="preview-notice"><Icon name="sparkle"/><p><strong>Store management preview.</strong> Changes affect this browser session only. These controls are for exploring sample inventory and orders.</p></div><div className="category-tabs" role="group" aria-label="Management view"><button aria-pressed={tab === 'inventory'} className={tab === 'inventory' ? 'selected' : ''} onClick={() => setTab('inventory')}>Inventory ({products.length})</button><button aria-pressed={tab === 'orders'} className={tab === 'orders' ? 'selected' : ''} onClick={() => setTab('orders')}>Orders ({orders.length})</button></div>
    {tab === 'inventory' ? <div className="inventory-list">{products.map(p => <InventoryRow key={`${p.id}-${p.stock}-${p.price}`} product={p}/>)}</div> : orders.length ? <div className="admin-orders">{orders.map(o => <article className="order-card" key={o.id}><div className="order-card-heading"><div><h2>{o.id}</h2><p>{o.items.reduce((n,i) => n + i.quantity, 0)} pieces · {money(o.total)} estimated</p></div><label>Status<select aria-label={`Status for order ${o.id}`} value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value as Order['status'])}>{['Processing','Shipped','Delivered','Cancelled'].map(s => <option key={s}>{s}</option>)}</select></label></div></article>)}</div> : <div className="empty-orders"><Icon name="bag"/><h2>No preview orders yet.</h2><p>Complete a sample checkout to see an order here.</p></div>}
  </div>;
}

