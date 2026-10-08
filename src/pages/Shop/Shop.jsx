import { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import ProductLoadMore from '../../components/product/ProductLoadMore';
import { useProducts } from '../../context/ProductContext';
import './Shop.css';

export default function ShopPage() {
  const { categorySlug } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort') ?? 'featured';
  const {
    products,
    categories,
    isLoading,
    isLoadingMore,
    error,
    loadMoreError,
    hasMore,
    loadMore,
    reload,
  } = useProducts();

  useEffect(() => {
    if (location.hash === '#categories') {
      document.getElementById('categories')?.scrollIntoView({ block: 'start' });
    }
  }, [location.hash, categories.length]);

  const activeCategory = categories.find((category) => category.slug === categorySlug) ?? null;
  const filteredProducts = useMemo(() => {
    const filtered = categorySlug
      ? products.filter((product) => product.categoryId === categorySlug)
      : [...products];

    if (sortBy === 'price-low') return filtered.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return filtered.sort((a, b) => b.price - a.price);
    if (sortBy === 'popular') return filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    return filtered.sort((a, b) => b.rating - a.rating);
  }, [categorySlug, products, sortBy]);

  const handleSortChange = (event) => {
    const nextParams = new URLSearchParams(searchParams);
    if (event.target.value === 'featured') nextParams.delete('sort');
    else nextParams.set('sort', event.target.value);
    setSearchParams(nextParams);
  };

  return (
    <div className="shop-page">
      <header className="page-header">
        <h1>{activeCategory ? activeCategory.name : 'Shop all products'}</h1>
        <p>
          {activeCategory
            ? `Explore products in ${activeCategory.name.toLowerCase()}.`
            : 'Discover products from every category.'}
        </p>
      </header>

      <div id="categories" className="shop-filters" aria-label="Product categories">
        <Link to="/shop" className={categorySlug ? 'filter-pill' : 'filter-pill active'}>
          All products
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            to={`/category/${category.slug}`}
            className={categorySlug === category.slug ? 'filter-pill active' : 'filter-pill'}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="search-toolbar">
        <div className="search-summary">
          {isLoading ? 'Loading products…' : `${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'} loaded`}
        </div>
        <label className="sort-control">
          <span>Sort by</span>
          <select value={sortBy} onChange={handleSortChange}>
            <option value="featured">Top rated</option>
            <option value="popular">Most reviewed</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>

      {error ? (
        <div className="empty-state-card" role="alert">
          <h2>We couldn’t load the catalog.</h2>
          <p>{error}</p>
          <button type="button" className="primary-btn" onClick={reload}>Try again</button>
        </div>
      ) : filteredProducts.length ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : !isLoading ? (
        <div className="empty-state-card">
          <h2>No products in this category yet.</h2>
          <Link to="/shop" className="primary-btn">Browse all products</Link>
        </div>
      ) : null}

      <ProductLoadMore
        hasMore={hasMore}
        isLoading={isLoadingMore}
        error={loadMoreError}
        onLoadMore={loadMore}
      />
    </div>
  );
}
