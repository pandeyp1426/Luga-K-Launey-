
import { Product, User, Order } from '../types';

export const mockProducts: Product[] = [
  { id: '1', name: 'Silk Evening Gown', price: 799.99, description: 'A stunning floor-length silk gown, perfect for formal events.', category: 'Clothing', imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800', stock: 10 },
  { id: '2', name: 'Italian Leather Loafers', price: 450.00, description: 'Handcrafted from the finest Italian leather, these loafers blend comfort and style.', category: 'Shoes', imageUrl: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=800', stock: 15 },
  { id: '3', name: 'Classic Trench Coat', price: 550.00, description: 'A timeless beige trench coat, essential for any wardrobe.', category: 'Clothing', imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800', stock: 20 },
  { id: '4', name: 'Diamond Stud Earrings', price: 1200.00, description: 'Elegant 1-carat diamond stud earrings set in platinum.', category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1617007439300-2d9721507a4a?q=80&w=800', stock: 5 },
  { id: '5', name: 'Cashmere Sweater', price: 320.00, description: 'Luxuriously soft cashmere sweater in a versatile charcoal grey.', category: 'Clothing', imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1682b8?q=80&w=800', stock: 25 },
  { id: '6', name: 'Suede Ankle Boots', price: 380.00, description: 'Chic and comfortable suede ankle boots with a block heel.', category: 'Shoes', imageUrl: 'https://images.unsplash.com/photo-1590779233253-045b2040f8c5?q=80&w=800', stock: 12 },
  { id: '7', name: 'Leather Tote Bag', price: 650.00, description: 'A spacious and stylish leather tote, perfect for work or weekend.', category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800', stock: 8 },
  { id: '8', name: 'Linen Blazer', price: 280.00, description: 'A lightweight and breathable linen blazer for a smart-casual look.', category: 'Clothing', imageUrl: 'https://images.unsplash.com/photo-1600275889372-2ab33a22b3a2?q=80&w=800', stock: 18 },
];

export const mockUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'customer' },
  { id: '2', name: 'Admin User', email: 'admin@chicthreads.com', role: 'admin' },
];

export const mockOrders: Order[] = [
    { id: 'ORD001', userId: '1', date: '2023-10-26', items: [{ ...mockProducts[0], quantity: 1 }], total: 799.99, status: 'Delivered' },
    { id: 'ORD002', userId: '1', date: '2023-11-15', items: [{ ...mockProducts[2], quantity: 1 }, { ...mockProducts[5], quantity: 1 }], total: 930.00, status: 'Shipped' },
    { id: 'ORD003', userId: '1', date: '2023-11-20', items: [{ ...mockProducts[4], quantity: 2 }], total: 640.00, status: 'Processing' },
];

