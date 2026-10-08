import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'eSharp-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(product.stock || 99, item.quantity + quantity) }
            : item,
        );
      }

      return [...current, { ...product, quantity: Math.min(product.stock || 99, quantity) }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.min(item.stock || 99, Math.max(0, quantity)) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (productId) => setItems((current) => current.filter((item) => item.id !== productId));
  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      subtotal,
      itemCount,
    }),
    [items, subtotal, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
}
