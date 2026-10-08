import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { fetchProductCategories, fetchProducts } from '../data/products';

const ProductContext = createContext(null);
const PAGE_SIZE = 40;

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [loadMoreError, setLoadMoreError] = useState('');
  const loadMoreLock = useRef(false);

  const loadMore = useCallback(async () => {
    if (loadMoreLock.current || isLoading || isLoadingMore || products.length >= total) return;
    loadMoreLock.current = true;
    setIsLoadingMore(true);
    setLoadMoreError('');
    try {
      const result = await fetchProducts({ limit: PAGE_SIZE, skip: products.length });
      setProducts((current) => [...current, ...result.products]);
      setTotal(result.total);
    } catch (requestError) {
      setLoadMoreError(requestError.message || 'Could not load more products.');
    } finally {
      loadMoreLock.current = false;
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, products.length, total]);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setLoadMoreError('');
    try {
      const [result, categoryResults] = await Promise.all([
        fetchProducts({ limit: PAGE_SIZE }),
        fetchProductCategories(),
      ]);
      setProducts(result.products);
      setTotal(result.total);
      setCategories(categoryResults);
    } catch (requestError) {
      setError(requestError.message || 'Could not load the product catalog.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = useMemo(
    () => ({
      products,
      categories,
      total,
      isLoading,
      isLoadingMore,
      error,
      loadMoreError,
      hasMore: products.length < total,
      loadMore,
      reload,
    }),
    [products, categories, total, isLoading, isLoadingMore, error, loadMoreError, loadMore, reload],
  );

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
}
