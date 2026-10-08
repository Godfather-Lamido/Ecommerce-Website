import { useState } from 'react';
import { Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { formatPrice } from '../../../data/products';
import Modal from '../../common/Modal/Modal';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { toggleItem, isItemSaved } = useWishlist();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const discount = Math.round(product.discountPercentage || (
    product.previousPrice && product.previousPrice > product.price
      ? ((product.previousPrice - product.price) / product.previousPrice) * 100
      : 0
  ));

  const saved = isItemSaved(product.id);

  const handleWishlistToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleItem(product.id);
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setQuantity(1);
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="product-card card">
        <div className="product-image-wrap">
          {discount > 0 && <span className="sale-badge">-{discount}%</span>}
          <button
            type="button"
            className={`wishlist-button ${saved ? 'active' : ''}`}
            aria-label={`Add ${product.name} to wishlist`}
            onClick={handleWishlistToggle}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
          <img src={product.image} alt={product.name} className="product-image" />
          {!product.stock && <div className="stock-overlay">Out of stock</div>}
        </div>

        <div className="product-body">
          <span className="category-label">{product.categoryId}</span>
          <Link to={`/product/${product.id}`} className="product-name-link">
            <h3>{product.name}</h3>
          </Link>

          <div className="product-rating">
            <span className="rating-stars">
              <Star size={14} fill="currentColor" />
              {product.rating}
            </span>
            <span className="review-count">({product.reviewCount})</span>
          </div>

          <div className="product-price-row">
            <div>
              <span className="current-price">{formatPrice(product.price, product.currency)}</span>
              {product.previousPrice && (
                <span className="previous-price">{formatPrice(product.previousPrice, product.currency)}</span>
              )}
            </div>
            {product.stock > 0 && <span className="stock-status">In stock</span>}
          </div>

          <button type="button" className="product-cart-button" disabled={!product.stock} onClick={() => setIsModalOpen(true)}>
            <ShoppingCart size={16} />
            {product.stock ? 'Add to cart' : 'Out of stock'}
          </button>
        </div>
      </article>

      <Modal isOpen={isModalOpen} title="Add to cart" onClose={() => setIsModalOpen(false)}>
        <div className="cart-modal-content">
          <div className="cart-modal-product">
            <img src={product.image} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>{product.categoryId}</p>
              <strong>{formatPrice(product.price, product.currency)}</strong>
            </div>
          </div>

          <div className="quantity-picker">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
              <Minus size={14} />
            </button>
            <span>{quantity}</span>
            <button type="button" onClick={() => setQuantity((value) => Math.min(product.stock || 99, value + 1))}>
              <Plus size={14} />
            </button>
          </div>

          <div className="cart-modal-summary">
            <span>Subtotal</span>
            <strong>{formatPrice(product.price * quantity, product.currency)}</strong>
          </div>

          <button type="button" className="product-cart-button" onClick={handleAddToCart}>
            <ShoppingCart size={16} />
            Add {quantity} to cart
          </button>
        </div>
      </Modal>
    </>
  );
}