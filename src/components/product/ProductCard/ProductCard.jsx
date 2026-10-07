import {
  Heart,
  ShoppingCart,
  Star,
} from "lucide-react";

import "./ProductCard.css";

export default function ProductCard({ product }) {
  const discount =
    product.previousPrice > product.price
      ? Math.round(
          ((product.previousPrice - product.price) /
            product.previousPrice) *
            100
        )
      : 0;

  return (
    <article className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
        {product.isOnSale && discount > 0 && (
          <span className="product-sale-badge">
            -{discount}%
          </span>
        )}

        <button
          className="product-wishlist"
          type="button"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={18} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        {!product.stock && (
          <div className="product-out-of-stock">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="product-content">
        <span className="product-category">
          {product.categoryId.replace("-", " ")}
        </span>

        <h3 className="product-name">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="product-rating">
          <div className="rating-stars">
            <Star
              size={14}
              fill="currentColor"
            />

            <span>{product.rating}</span>
          </div>

          <span className="review-count">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="product-price-row">
          <div className="product-prices">
            <span className="product-price">
              ₦{product.price.toLocaleString()}
            </span>

            {product.previousPrice && (
              <span className="product-previous-price">
                ₦{product.previousPrice.toLocaleString()}
              </span>
            )}
          </div>

          {product.stock > 0 && (
            <span className="product-stock">
              In stock
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <button
          className="product-cart-button"
          type="button"
          disabled={!product.stock}
        >
          <ShoppingCart size={17} />

          <span>
            {product.stock ? "Add to Cart" : "Out of Stock"}
          </span>
        </button>
      </div>
    </article>
  );
}