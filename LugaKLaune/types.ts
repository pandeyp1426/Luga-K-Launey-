export interface Product {
  id: string; name: string; price: number; originalPrice?: number; description: string;
  category: 'Clothing' | 'Shoes' | 'Accessories'; audience: 'Women' | 'Men' | 'Everyone';
  imageUrl: string; imageAlt: string; stock: number; color: string; swatch: string;
  sizes: string[]; tag?: string; material: string;
}
export interface CartItem extends Product { quantity: number; size: string; lineId: string }
export interface User { id: string; name: string; email: string; role: 'customer' | 'admin' }
export interface Order {
  id: string; userId: string; date: string; items: CartItem[]; total: number;
  subtotal: number; shipping: number; status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}
export interface ChatMessage { role: 'user' | 'model'; text: string }
