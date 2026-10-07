import { ArrowRight } from "lucide-react";
// import products from "../../../data/product";
// import ProductGrid from "../../../components/product/ProductGrid/ProductGrid";

import "./FeaturedProducts.css";

export default function FeaturedProducts() {
  const featuredProducts = products
    .filter((product) => product.isFeatured)
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

        <a href="/shop" className="view-products-link">
          View All
          <ArrowRight size={16} />
        </a>
      </div>

      {/* <ProductGrid products={featuredProducts} /> */}
    </section>
  );
}