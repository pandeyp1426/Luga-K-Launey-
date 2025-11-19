
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { User, CartItem, Product, Order } from '../types';
import { mockUsers, mockProducts, mockOrders } from '../data/mock';

interface AppContextType {
  user: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  products: Product[];
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateProduct: (product: Product) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const login = (email: string): boolean => {
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
      setCart([]);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(o => o.id === orderId ? {...o, status} : o));
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p));
  };

  const value = {
    user,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    products,
    orders,
    updateOrderStatus,
    updateProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

