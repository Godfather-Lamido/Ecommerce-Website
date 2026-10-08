import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "../../../context/ProductContext";
import ProductGrid from "../../../components/product/ProductGrid/ProductGrid";

import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const { products, isLoading, error, reload } = useProducts();
  const featuredProducts = [...products]
    .sort((first, second) => second.rating - first.rating)
    .slice(0, 8);

  return (
    <section className="featured-products">
      <div className="featured-products-header">
        <div>
          <span className="section-eyebrow">
            HANDPICKED FOR YOU
          </span>

          <h2>Featured Products</h2>

          <p>
            Discover some of our most popular products,
            carefully selected for you.
          </p>
        </div>

        <Link to="/shop?sort=featured" className="view-products-link">
          View All
          <ArrowRight size={16} />
        </Link>
      </div>

      {error ? (
        <div role="alert">
          <p>Could not load products: {error}</p>
          <button type="button" onClick={reload}>Try again</button>
        </div>
      ) : isLoading ? (
        <p>Loading products…</p>
      ) : (
        <ProductGrid products={featuredProducts} />
      )}
    </section>
  );
}