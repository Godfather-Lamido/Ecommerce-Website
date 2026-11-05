
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
} from 'lucide-react';

import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { formatPrice } from '../../data/products';
import Modal from '../../components/common/Modal/Modal';

import './ProductDetails.css';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    products,
    categories,
    isLoading,
    error,
  } = useProducts();

  const { addItem } = useCart();
  const { toggleItem, isItemSaved } = useWishlist();

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(
    (entry) => String(entry.id) === productId
  );

  const categoryName =
    categories.find(
      (category) => category.slug === product?.categoryId
    )?.name ??
    String(product?.categoryId ?? '').replaceAll('-', ' ');

  // Reset the quantity and close the modal when the product changes.
  useEffect(() => {
    setQuantity(1);
    setIsCartModalOpen(false);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="empty-state-card">
        <h2>Loading product…</h2>
        <p>Please wait while we load the product details.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state-card" role="alert">
        <h2>We couldn’t load the product catalogue.</h2>
        <p>{error}</p>
        <Link to="/shop" className="primary-btn">
          Return to shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="empty-state-card">
        <h2>Product not found</h2>
        <p>The product you’re looking for may no longer be available.</p>
        <Link to="/shop" className="primary-btn">
          Browse products
        </Link>
      </div>
    );
  }

  const isInStock = product.stock > 0;
  const isSaved = isItemSaved(product.id);

  const handleAddToCart = () => {
    if (!isInStock || quantity > product.stock) return;

    addItem(product, quantity);
    setQuantity(1);
    setIsCartModalOpen(false);
  };

  return (
    <div className="product-details-page">
      <div className="product-details-toolbar">
        <button
          type="button"
          className="product-back-button"
          onClick={() =>
            navigate(window.history.state?.idx > 0 ? -1 : '/shop')
          }
        >
          <ChevronLeft size={18} aria-hidden="true" />
          <span>Back</span>
        </button>
      </div>

      <div className="product-details-grid">
        <div className="product-gallery card">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-detail-copy">
          <span className="eyebrow">{categoryName}</span>

          <h1>{product.name}</h1>

          <div className="product-meta-row">
            <span>
              {isInStock ? 'In stock' : 'Out of stock'}
            </span>
          </div>

          <div className="product-price-block">
            <span className="detail-price">
              {formatPrice(product.price, product.currency)}
            </span>

            {product.previousPrice && (
              <span className="detail-previous">
                {formatPrice(
                  product.previousPrice,
                  product.currency
                )}
              </span>
            )}
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div className="detail-actions">
            <button
              type="button"
              className="primary-btn large-btn"
              disabled={!isInStock}
              onClick={() => setIsCartModalOpen(true)}
            >
              <ShoppingCart size={16} />
              {isInStock ? 'Add to cart' : 'Out of stock'}
            </button>

            <button
              type="button"
              className="secondary-btn large-btn"
              aria-pressed={isSaved}
              onClick={() => toggleItem(product.id)}
            >
              <Heart
                size={16}
                fill={isSaved ? 'currentColor' : 'none'}
              />
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCartModalOpen}
        title="Add to cart"
        onClose={() => {
          setIsCartModalOpen(false);
          setQuantity(1);
        }}
      >
        <div className="cart-modal-content">
          <div className="cart-modal-product">
            <img src={product.image} alt={product.name} />

            <div>
              <h4>{product.name}</h4>
              <p>{categoryName}</p>

              <strong>
                {formatPrice(product.price, product.currency)}
              </strong>
            </div>
          </div>

          <div className="quantity-picker">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() =>
                setQuantity((current) => Math.max(1, current - 1))
              }
            >
              <Minus size={14} />
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity >= product.stock}
              onClick={() =>
                setQuantity((current) =>
                  Math.min(product.stock, current + 1)
                )
              }
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="cart-modal-summary">
            <span>Subtotal</span>

            <strong>
              {formatPrice(
                product.price * quantity,
                product.currency
              )}
            </strong>
          </div>

          <button
            type="button"
            className="product-cart-button"
            disabled={!isInStock || quantity > product.stock}
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} />
            Add {quantity} to cart
          </button>
        </div>
      </Modal>
    </div>
  );
}
