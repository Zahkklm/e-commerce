import { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, getTotal }}>
      {children}
    </CartContext.Provider>
  );
};