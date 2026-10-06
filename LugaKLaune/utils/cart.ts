import type { CartItem, Product } from '../types';
export function hydrateCart(value: unknown, products: Product[]): CartItem[] {
  if (!Array.isArray(value)) return [];
  const result: CartItem[] = [];
  for (const item of value) {
    if (!item || typeof item !== 'object') continue;
    const p = products.find(p => p.id === item.id);
    if (!p || !p.sizes.includes(item.size) || !Number.isInteger(item.quantity) || item.quantity < 1) continue;
    const already = result.filter(i => i.id === p.id).reduce((n, i) => n + i.quantity, 0);
    const quantity = Math.min(item.quantity, p.stock - already);
    const lineId = `${p.id}:${item.size}`;
    if (quantity > 0 && !result.some(i => i.lineId === lineId)) result.push({ ...p, quantity, size: item.size, lineId });
  }
  return result;
}
export function withAddedItem(cart: CartItem[], product: Product, size: string): CartItem[] {
  if (!product.sizes.includes(size)) return cart;
  const used = cart.filter(i => i.id === product.id).reduce((n, i) => n + i.quantity, 0);
  if (used >= product.stock) return cart;
  const lineId = `${product.id}:${size}`;
  return cart.some(i => i.lineId === lineId)
    ? cart.map(i => i.lineId === lineId ? { ...i, quantity: i.quantity + 1 } : i)
    : [...cart, { ...product, size, quantity: 1, lineId }];
}
export function withQuantity(cart: CartItem[], products: Product[], lineId: string, quantity: number): CartItem[] {
  if (!Number.isInteger(quantity) || quantity < 1) return cart;
  return cart.map(item => {
    if (item.lineId !== lineId) return item;
    const stock = products.find(p => p.id === item.id)?.stock || 0;
    const other = cart.filter(i => i.id === item.id && i.lineId !== lineId).reduce((n, i) => n + i.quantity, 0);
    return { ...item, quantity: Math.min(quantity, Math.max(1, stock - other)) };
  });
}
export function subtotalOf(cart: CartItem[]): number {
  return cart.reduce((cents, item) => cents + Math.round(item.price * 100) * item.quantity, 0) / 100;
}

