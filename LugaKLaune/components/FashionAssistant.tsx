import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { money, useApp } from '../context/AppContext';
import Icon from './Icon';
export default function FashionAssistant() {
  const { products } = useApp();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selection, setSelection] = useState('');
  useEffect(() => { if (open) { dialog.current?.showModal(); inputRef.current?.focus(); } else if (dialog.current?.open) { dialog.current.close(); trigger.current?.focus(); } }, [open]);
  const prompt = selection.toLowerCase();
  const ids = /work|smart|office|tailor/.test(prompt) ? ['1','2','4'] : /night|dinner|date|party/.test(prompt) ? ['7','4','8'] : /weekend|casual|everyday/.test(prompt) ? ['2','3','5'] : [];
  const matches = selection ? products.filter(p => ids.length ? ids.includes(p.id) : `${p.name} ${p.description} ${p.category} ${p.color}`.toLowerCase().includes(prompt)).slice(0,3) : [];
  return <><button ref={trigger} className="assistant-trigger" aria-label="Open style finder" aria-haspopup="dialog" onClick={() => setOpen(true)}><Icon name="sparkle" width="19" height="19"/><span>Style finder</span></button><dialog className="assistant-dialog" ref={dialog} onCancel={() => setOpen(false)} onClick={e => { if (e.target === e.currentTarget) setOpen(false); }} aria-labelledby="assistant-title"><div className="assistant-header"><div><p className="eyebrow">A FRESH PERSPECTIVE</p><h2 id="assistant-title">Find your everyday.</h2></div><button className="icon-button" aria-label="Close style finder" onClick={() => setOpen(false)}><Icon name="close"/></button></div><div className="assistant-body"><p>A little inspiration from the Hima collection. What’s the mood?</p><div className="mood-buttons">{['Weekend easy','A smarter everyday','Going out tonight'].map(mood => <button key={mood} className={selection === mood ? 'selected' : ''} aria-pressed={selection === mood} onClick={() => setSelection(mood)}>{mood}<Icon name="arrow" width="16" height="16"/></button>)}</div>
      <div aria-live="polite">{selection && <><h3>{matches.length ? 'A few pieces to make it yours.' : 'Let’s try another direction.'}</h3>{matches.length ? <div className="assistant-results">{matches.map(p => <Link to={`/product/${p.id}`} key={p.id} onClick={() => setOpen(false)}><img src={p.imageUrl} alt="" width="60" height="75"/><div><strong>{p.name}</strong><span>{p.color} · {money(p.price)}</span></div><Icon name="arrow" width="16" height="16"/></Link>)}</div> : <p>Try “denim”, “blazer”, “knit”, or one of the moods above.</p>}</>}</div>
      <form onSubmit={e => { e.preventDefault(); if (query.trim()) setSelection(query.trim()); }}><label htmlFor="style-query">Or find a piece you have in mind</label><div className="assistant-input"><input ref={inputRef} id="style-query" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try “denim”" maxLength={100}/><button type="submit" aria-label="Find style suggestions" disabled={!query.trim()}><Icon name="arrow"/></button></div></form><p className="assistant-footnote">Suggestions from our collection, chosen around your mood.</p></div></dialog></>;
}

