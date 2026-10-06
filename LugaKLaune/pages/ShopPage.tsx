import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Icon from '../components/Icon';
import { useApp } from '../context/AppContext';
export default function ShopPage({ saved = false }: { saved?: boolean }) {
  const { products, wishlist } = useApp();
  const [params, setParams] = useSearchParams();
  const category = params.get('category') || 'All';
  const audience = params.get('audience') || 'Everyone';
  const query = params.get('q') || '';
  const edit = params.get('edit') || '';
  const sort = params.get('sort') || 'featured';
  const available = params.get('available') === 'true';
  const update = (key: string, value: string) => { const next = new URLSearchParams(params); if (value && value !== 'All' && value !== 'Everyone' && value !== 'featured') next.set(key, value); else next.delete(key); setParams(next, { replace: true }); };
  const filtered = products.filter(p => (!saved || wishlist.includes(p.id)) && (category === 'All' || p.category === category) && (audience === 'Everyone' || p.audience === audience || p.audience === 'Everyone') && (!available || p.stock > 0) && (edit !== 'sale' || p.originalPrice) && (edit !== 'new' || p.tag === 'NEW') && (edit !== 'essentials' || ['2','3','5','6'].includes(p.id)) && `${p.name} ${p.category} ${p.color} ${p.description} ${p.audience}`.toLowerCase().includes(query.toLowerCase()));
  const sorted = [...filtered].sort((a,b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'name' ? a.name.localeCompare(b.name) : 0);
  const title = saved ? 'Your kind of favorites.' : query ? `Results for “${query}”` : edit === 'new' ? 'A fresh point of view.' : edit === 'sale' ? 'One last chance.' : edit === 'essentials' ? 'The everyday essentials.' : audience !== 'Everyone' ? `The ${audience.toLowerCase()}’s edit.` : category !== 'All' ? `${category}. Your way.` : 'Find your next favorite.';
  return <div className="shop-page shell page-spacing"><p className="eyebrow">{saved ? 'SAVED FOR LATER, LOVED FOREVER' : 'THE HIMA COLLECTION'}</p><h1 className="page-title">{title}</h1><p className="page-description">{saved ? 'All the pieces you have your eye on, together in one place.' : 'Easy layers, thoughtful details, and a little more you.'}</p>
    <div className="shop-toolbar"><div className="category-tabs" role="group" aria-label="Product category">{['All','Clothing','Shoes','Accessories'].map(c => <button key={c} className={category === c ? 'selected' : ''} aria-pressed={category === c} onClick={() => update('category', c)}>{c === 'All' ? 'All pieces' : c}</button>)}</div><label className="sort-label">Sort by <select value={sort} onChange={e => update('sort', e.target.value)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name: A to Z</option></select></label></div>
    <div className="shop-subtools"><p role="status">{sorted.length} {sorted.length === 1 ? 'piece' : 'pieces'}</p><label className="check-label"><input type="checkbox" checked={available} onChange={e => update('available', e.target.checked ? 'true' : '')}/> In stock only</label>{(query || edit || category !== 'All' || audience !== 'Everyone' || available) && <button className="underlined-button" onClick={() => setParams({})}>Clear filters</button>}</div>
    {sorted.length ? <div className="product-grid">{sorted.map(p => <ProductCard key={p.id} product={p}/>)}</div> : <div className="empty-state"><Icon name={saved ? 'heart' : 'search'} width="40" height="40"/><h2>{saved && !wishlist.length ? 'A place for your favorites.' : 'No pieces found.'}</h2><p>{saved && !wishlist.length ? 'Tap the heart on a piece you love to save it here.' : 'Try a different search or clear your filters to see more.'}</p><Link to="/shop" className="button button-dark">Explore all pieces <Icon name="arrow"/></Link></div>}
  </div>;
}
