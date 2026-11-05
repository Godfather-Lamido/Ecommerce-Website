import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { fetchProducts, fetchProductCategories } from "../data/products";

const ProductContext = createContext(null);

const PAGE_SIZE = 100;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [error, setError] = useState(null);
  const [loadMoreError, setLoadMoreError] = useState(null);

  const loadMoreLock = useRef(false);

  const hasMore = products.length < total;

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLoadMoreError(null);
    loadMoreLock.current = false;

    try {
      const [productResult, categoryResult] = await Promise.all([
        fetchProducts({ limit: PAGE_SIZE, skip: 0 }),
        fetchProductCategories(),
      ]);

      setProducts(productResult.products);
      setTotal(productResult.total);
      setCategories(categoryResult);
    } catch (err) {
      console.error("Failed to load products:", err);

      setError(err.message || "Something went wrong while loading products.");

      setProducts([]);
      setTotal(0);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (
      loadMoreLock.current ||
      isLoading ||
      isLoadingMore ||
      products.length >= total
    ) {
      return;
    }

    loadMoreLock.current = true;
    setIsLoadingMore(true);
    setLoadMoreError(null);

    try {
      const result = await fetchProducts({
        limit: PAGE_SIZE,
        skip: products.length,
      });

      setProducts((currentProducts) => {
        const existingIds = new Set(
          currentProducts.map((product) => product.id),
        );

        const newProducts = result.products.filter(
          (product) => !existingIds.has(product.id),
        );

        return [...currentProducts, ...newProducts];
      });

      setTotal(result.total);
    } catch (err) {
      console.error("Failed to load more products:", err);

      setLoadMoreError(
        err.message || "Could not load more products. Please try again.",
      );
    } finally {
      setIsLoadingMore(false);
      loadMoreLock.current = false;
    }
  }, [isLoading, isLoadingMore, products.length, total]);

  useEffect(() => {
    reload();
  }, [reload]);

  const value = {
    products,
    categories,
    total,
    isLoading,
    isLoadingMore,
    error,
    loadMoreError,
    hasMore,
    reload,
    loadMore,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};

export default ProductContext;
