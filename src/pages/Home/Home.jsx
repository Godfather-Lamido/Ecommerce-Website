import { Link } from 'react-router-dom';
import { PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import Hero from '../hero/Hero';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import { useProducts } from '../../context/ProductContext';
import './Home.css';

export default function Home() {
  const { products, isLoading, error, reload } = useProducts();
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const bestSellers = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 4);

  return (
    <>
      <Hero />

      <section className="feature-row">
        <div className="feature-pill">
          <Truck size={18} />
          Free shipping on qualifying orders
        </div>
        <div className="feature-pill">
          <ShieldCheck size={18} />
          Secure checkout
        </div>
        <div className="feature-pill">
          <PackageCheck size={18} />
          Easy returns
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Featured products</h2>
          <Link to="/shop?sort=featured">See more</Link>
        </div>
        {error ? (
          <div className="empty-state-card" role="alert">
            <p>Could not load products: {error}</p>
            <button type="button" className="primary-btn" onClick={reload}>Try again</button>
          </div>
        ) : isLoading ? (
          <p className="catalog-status">Loading products…</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="promo-banner card">
        <div>
          <span className="eyebrow">Weekend flash sale</span>
          <h3>Save up to 40% on everyday favourites.</h3>
        </div>
        <Link to="/shop" className="primary-btn">Shop deals</Link>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Best sellers</h2>
          <Link to="/shop?sort=popular">View collection</Link>
        </div>
        <div className="product-grid">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
