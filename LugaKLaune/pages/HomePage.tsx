import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useApp } from '../context/AppContext';
import Icon from '../components/Icon';
export default function HomePage() {
  const { products } = useApp();
  const [category, setCategory] = useState('All');
  const shown = products.filter(p => category === 'All' || p.category === category).slice(0, 4);
  return <>
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow"><span className="tiny-cross">✳</span> THE EVERYDAY COLLECTION — VOL. 01</p><h1 id="hero-title">A little<br/>more <em>you.</em></h1><p className="hero-description">Fresh perspectives. Effortless pieces.<br/>For wherever your everyday takes you.</p><Link to="/shop?edit=new" className="button button-red">Discover new arrivals <Icon name="arrow"/></Link><div className="hero-footnote"><span>INDIVIDUAL BY NATURE.</span><span>HIMA / 2026</span></div></div>
      <div className="hero-image"><img src="/images/hero.jpg" alt="A woman in a black dress and boots, framed by sunlit modern architecture" width="1000" height="1500" fetchPriority="high"/><span className="image-caption">A NEW SEASON OF YOU.</span><Link to="/shop?audience=Women" className="hero-shop-link"><span>Explore the collection</span><Icon name="arrow"/></Link></div>
    </section>
    <div className="brand-strip shell"><span>GOOD STYLE. YOUR RULES.</span><p>Everyday pieces. A point of view that’s all yours.</p><Link to="/about" className="text-link">Meet Hima <Icon name="arrow" width="18" height="18"/></Link></div>
    <section className="section shell" aria-labelledby="new-title">
      <div className="section-heading"><div><p className="eyebrow">FRESH FINDS, GOOD FEELINGS</p><h2 id="new-title">New & noteworthy.</h2></div><Link to="/shop" className="text-link">Shop all pieces <Icon name="arrow" width="20" height="20"/></Link></div>
      <div className="category-tabs" role="group" aria-label="Filter featured products">{['All','Clothing','Shoes','Accessories'].map(c => <button key={c} aria-pressed={category === c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c === 'All' ? 'All favorites' : c}</button>)}</div>
      <div className="product-grid">{shown.map(product => <ProductCard key={product.id} product={product}/>)}</div>
    </section>
    <section className="section category-section shell" aria-labelledby="category-title"><div className="section-heading"><div><p className="eyebrow">FIND YOUR KIND OF EVERYDAY</p><h2 id="category-title">Made for your rotation.</h2></div><span className="muted">Less overthinking. More getting dressed.</span></div>
      <div className="category-grid">
        <Link to="/shop?audience=Women" className="category-card"><img src="/images/editorial-blazer.jpg" loading="lazy" alt="Relaxed tailoring with a brown blazer and denim" width="600" height="750"/><div><span>01 / THE WOMEN’S EDIT</span><h3>Everyday, elevated.<Icon name="arrow"/></h3></div></Link>
        <Link to="/shop?edit=essentials" className="category-card"><img src="/images/knit.jpg" loading="lazy" alt="A soft, textured neutral knit sweater" width="900" height="750"/><div><span>02 / THE ESSENTIALS</span><h3>Your forever favorites.<Icon name="arrow"/></h3></div></Link>
        <Link to="/shop?category=Accessories" className="category-card"><img src="/images/black-bag.jpg" loading="lazy" alt="A black chain shoulder bag completing an everyday outfit" width="600" height="750"/><div><span>03 / THE FINISHING TOUCHES</span><h3>It’s in the details.<Icon name="arrow"/></h3></div></Link>
      </div>
    </section>
    <section className="editorial-banner shell"><div className="editorial-copy"><p className="eyebrow">THE HIMA PERSPECTIVE</p><h2>Wear what<br/>feels like <em>you.</em></h2><p>Trends come and go. Your point of view is here to stay. Meet the pieces that make getting dressed feel a little more like self-expression.</p><Link to="/about" className="button button-light">The story behind Hima <Icon name="arrow"/></Link></div><div className="editorial-image"><img src="/images/editorial-blazer.jpg" loading="lazy" alt="A personal take on everyday tailoring" width="600" height="750"/><span className="editorial-wordmark" aria-hidden="true">hima</span></div></section>
  </>;
}

