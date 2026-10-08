import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import ProductLoadMore from '../../components/product/ProductLoadMore';
import { fetchProducts, searchProducts } from '../../data/products';
import './Search.css';

const PAGE_SIZE = 40;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const [inputValue, setInputValue] = useState(query);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [loadMoreError, setLoadMoreError] = useState('');
  const [requestVersion, setRequestVersion] = useState(0);
  const loadMoreLock = useRef(false);
  const currentQuery = useRef(query);
  currentQuery.current = query;

  useEffect(() => setInputValue(query), [query]);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError('');
    setLoadMoreError('');

    const request = query
      ? searchProducts(query, { limit: PAGE_SIZE, signal: controller.signal })
      : fetchProducts({ limit: PAGE_SIZE, signal: controller.signal });

    request.then((result) => {
      setProducts(result.products);
      setTotal(result.total);
    }).catch((requestError) => {
      if (requestError.code !== 'ERR_CANCELED') {
        setError(requestError.message || 'Could not load search results.');
      }
    }).finally(() => {
      if (!controller.signal.aborted) setIsLoading(false);
    });

    return () => controller.abort();
  }, [query, requestVersion]);

  const loadMore = useCallback(async () => {
    if (loadMoreLock.current || isLoading || isLoadingMore || products.length >= total) return;
    loadMoreLock.current = true;
    setIsLoadingMore(true);
    setLoadMoreError('');
    try {
      const options = { limit: PAGE_SIZE, skip: products.length };
      const result = query
        ? await searchProducts(query, options)
        : await fetchProducts(options);
      if (currentQuery.current !== query) return;
      setProducts((current) => [...current, ...result.products]);
      setTotal(result.total);
    } catch (requestError) {
      if (currentQuery.current === query) {
        setLoadMoreError(requestError.message || 'Could not load more results.');
      }
    } finally {
      loadMoreLock.current = false;
      setIsLoadingMore(false);
    }
  }, [isLoading, isLoadingMore, products.length, query, total]);

  const sortedProducts = useMemo(() => {
    const sorted = [...products];
    if (sortBy === 'price-low') return sorted.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return sorted.sort((a, b) => b.price - a.price);
    if (sortBy === 'popular') return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    return sorted.sort((a, b) => b.rating - a.rating);
  }, [products, sortBy]);

  const handleSearch = (event) => {
    event.preventDefault();
    const nextQuery = inputValue.trim();
    setSearchParams(nextQuery ? { q: nextQuery } : {});
  };

  return (
    <div className="search-page">
      <header className="page-header">
        <h1>Search products</h1>
        <p>{query ? `Results for “${query}”` : 'Browse the full catalog'}</p>
      </header>

      <form className="search-form" role="search" onSubmit={handleSearch}>
        <input
          type="search"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="Search products, brands, or categories"
          aria-label="Search products"
        />
        <button type="submit" className="primary-btn">Search</button>
      </form>

      <div className="search-toolbar">
        <div className="search-summary">
          {isLoading ? 'Searching…' : `${sortedProducts.length} of ${total} products`}
        </div>
        <label className="sort-control">
          <span>Sort by</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            <option value="featured">Top rated</option>
            <option value="popular">Most reviewed</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      {error ? (
        <div className="empty-state-card" role="alert">
          <h2>Search is temporarily unavailable.</h2>
          <p>{error}</p>
          <button type="button" className="primary-btn" onClick={() => setRequestVersion((value) => value + 1)}>
            Try again
          </button>
        </div>
      ) : sortedProducts.length ? (
        <div className="product-grid">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : !isLoading ? (
        <div className="empty-state-card">
          <h2>No products matched your search.</h2>
          <Link to="/shop" className="primary-btn">Browse all products</Link>
        </div>
      ) : null}

      <ProductLoadMore
        hasMore={products.length < total}
        isLoading={isLoadingMore}
        error={loadMoreError}
        onLoadMore={loadMore}
      />
    </div>
  );
}
