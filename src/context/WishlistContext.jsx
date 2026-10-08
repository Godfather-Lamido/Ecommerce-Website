import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'eSharp-wishlist';

export function WishlistProvider({ children }) {
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

  const toggleItem = (productId) => {
    setItems((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    );
  };

  const value = useMemo(
    () => ({
      items,
      toggleItem,
      isItemSaved: (productId) => items.includes(productId),
    }),
    [items],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}
