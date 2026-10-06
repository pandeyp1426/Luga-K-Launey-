import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, CartItem, Product, Order } from '../types';
import { mockProducts, mockUsers } from '../data/mock';
import { hydrateCart, withAddedItem, withQuantity, subtotalOf } from '../utils/cart';
const storageKey = 'hima-store-v1';
const load = (): Record<string, unknown> => { try { const data = JSON.parse(localStorage.getItem(storageKey) || '{}'); return data && typeof data === 'object' ? data : {}; } catch { return {}; } };
const save = (value: unknown) => { try { localStorage.setItem(storageKey, JSON.stringify(value)); } catch { /* Shopping works without storage. */ } };
export const money = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2, minimumFractionDigits: 0 }).format(amount);
export const shippingFor = (subtotal: number) => subtotal >= 100 || subtotal === 0 ? 0 : 8;
interface AppContextType {
  user: User | null; login: (email: string) => boolean; logout: () => void;
  cart: CartItem[]; addToCart: (product: Product, size?: string) => boolean;
  removeFromCart: (lineId: string) => void; updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void; cartTotal: number; products: Product[]; orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateProduct: (product: Product) => void; placeOrder: () => Order | null;
  wishlist: string[]; toggleWishlist: (id: string) => void; notice: string; notify: (message: string) => void;
}
const AppContext = createContext<AppContextType | undefined>(undefined);
export function AppProvider({ children }: { children: ReactNode }) {
  const [stored] = useState(load);
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cart, setCart] = useState<CartItem[]>(() => hydrateCart(stored.cart, mockProducts));
  const [wishlist, setWishlist] = useState<string[]>(() => Array.isArray(stored.wishlist) ? [...new Set(stored.wishlist.filter((id): id is string => typeof id === 'string' && mockProducts.some(p => p.id === id)))] : []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notice, notify] = useState('');
  useEffect(() => { save({ cart: cart.map(({ id, size, quantity }) => ({ id, size, quantity })), wishlist }); }, [cart, wishlist]);
  useEffect(() => { if (!notice) return; const timer = setTimeout(() => notify(''), 4500); return () => clearTimeout(timer); }, [notice]);
  const login = (email: string) => { const found = mockUsers.find(u => u.email === email); if (!found) return false; setUser(found); return true; };
  const addToCart = (product: Product, size = product.sizes[0]) => {
    const current = products.find(p => p.id === product.id);
    if (!current || !current.sizes.includes(size)) return false;
    if (cart.filter(i => i.id === product.id).reduce((n, i) => n + i.quantity, 0) >= current.stock) { notify('You have all available pieces of this item in your bag.'); return false; }
    setCart(previous => withAddedItem(previous, current, size));
    notify(`${product.name} added to your bag.`); return true;
  };
  const updateQuantity = (lineId: string, quantity: number) => setCart(previous => withQuantity(previous, products, lineId, quantity));
  const cartTotal = subtotalOf(cart);
  const placeOrder = () => {
    if (!cart.length) return null;
    const invalid = cart.some(item => { const p = products.find(p => p.id === item.id); return !p || p.price !== item.price || cart.filter(i => i.id === item.id).reduce((n, i) => n + i.quantity, 0) > p.stock; });
    if (invalid) { notify('Your bag has changed. Please review the available items.'); return null; }
    const shipping = shippingFor(cartTotal);
    const order: Order = { id: `HIMA-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, userId: user?.id || 'preview-customer', date: new Date().toISOString(), items: cart.map(i => ({ ...i })), total: cartTotal + shipping, subtotal: cartTotal, shipping, status: 'Processing' };
    setOrders(prev => [order, ...prev]);
    setProducts(prev => prev.map(p => ({ ...p, stock: p.stock - cart.filter(i => i.id === p.id).reduce((n, i) => n + i.quantity, 0) })));
    setCart([]); return order;
  };
  const updateProduct = (p: Product) => {
    if (user?.role !== 'admin' || !Number.isFinite(p.price) || p.price <= 0 || !Number.isInteger(p.stock) || p.stock < 0) return;
    setProducts(prev => prev.map(item => item.id === p.id ? p : item));
    setCart(prev => { let remaining = p.stock; return prev.flatMap(item => { if (item.id !== p.id) return [item]; const quantity = Math.min(item.quantity, remaining); remaining -= quantity; return quantity > 0 ? [{ ...item, ...p, quantity }] : []; }); });
    notify('Preview inventory updated.');
  };
  return <AppContext.Provider value={{ user, login, logout: () => setUser(null), cart, addToCart, removeFromCart: lineId => setCart(prev => prev.filter(i => i.lineId !== lineId)), updateQuantity, clearCart: () => setCart([]), cartTotal, products, orders, placeOrder, updateProduct, updateOrderStatus: (id, status) => { if (user?.role === 'admin') setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o)); }, wishlist, toggleWishlist: id => { setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]); }, notice, notify }}>{children}</AppContext.Provider>;
}
export function useApp() { const context = useContext(AppContext); if (!context) throw new Error('useApp must be used within AppProvider'); return context; }
