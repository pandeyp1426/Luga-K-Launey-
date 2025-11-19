
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Clothing' | 'Shoes' | 'Accessories';
  imageUrl: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
}

