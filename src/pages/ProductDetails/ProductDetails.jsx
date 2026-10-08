import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import { fetchProductById, formatPrice } from '../../data/products';
import Modal from '../../components/common/Modal/Modal';
import './ProductDetails.css';

export default function ProductDetailsPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addItem } = useCart();
  const { toggleItem, isItemSaved } = useWishlist();
  const catalogProduct = products.find((entry) => String(entry.id) === productId);
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const product = catalogProduct ?? fetchedProduct;

  useEffect(() => {
    if (catalogProduct || !productId) return undefined;
    const controller = new AbortController();
    setIsLoading(true);
    setError('');
    fetchProductById(productId, { signal: controller.signal })
      .then(setFetchedProduct)
      .catch((requestError) => {
        if (requestError.code !== 'ERR_CANCELED') {
          setError(requestError.message || 'Could not load this product.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });
    return () => controller.abort();
  }, [catalogProduct, productId]);

  if (!product) {
    return (
      <div className="empty-state-card" role={error ? 'alert' : undefined}>
        <h2>{isLoading ? 'Loading product…' : error ? 'We couldn’t load this product.' : 'Product not found'}</h2>
        {error && <p>{error}</p>}
        <Link to="/shop" className="primary-btn">Return to shop</Link>
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details-toolbar">
        <button
          type="button"
          className="product-back-button"
          onClick={() => navigate(window.history.state?.idx > 0 ? -1 : '/shop')}
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
          <span className="eyebrow">{product.categoryId.replaceAll('-', ' ')}</span>
          <h1>{product.name}</h1>
          <div className="product-meta-row">
            <span className="rating-inline">
              <Star size={16} fill="currentColor" />
              {product.rating}
            </span>
            <span>{product.reviewCount} reviews</span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
          </div>

          <div className="product-price-block">
            <span className="detail-price">{formatPrice(product.price, product.currency)}</span>
            {product.previousPrice && (
              <span className="detail-previous">{formatPrice(product.previousPrice, product.currency)}</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="detail-actions">
            <button
              type="button"
              className="primary-btn large-btn"
              disabled={!product.stock}
              onClick={() => setIsCartModalOpen(true)}
            >
              <ShoppingCart size={16} />
              {product.stock ? 'Add to cart' : 'Out of stock'}
            </button>
            <button
              type="button"
              className="secondary-btn large-btn"
              aria-pressed={isItemSaved(product.id)}
              onClick={() => toggleItem(product.id)}
            >
              <Heart size={16} fill={isItemSaved(product.id) ? 'currentColor' : 'none'} />
              {isItemSaved(product.id) ? 'Saved' : 'Save'}
            </button>
          </div>

          <ul className="product-highlights">
            <li>Fast delivery within 2–4 working days</li>
            <li>Secure checkout and easy returns</li>
            <li>Product details and availability updated regularly</li>
          </ul>
        </div>
      </div>
      <Modal isOpen={isCartModalOpen} title="Add to cart" onClose={() => setIsCartModalOpen(false)}>
        <div className="cart-modal-content">
          <div className="cart-modal-product">
            <img src={product.image} alt={product.name} />
            <div>
              <h4>{product.name}</h4>
              <p>{product.categoryId.replaceAll('-', ' ')}</p>
              <strong>{formatPrice(product.price, product.currency)}</strong>
            </div>
          </div>
          <div className="quantity-picker">
            <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>
              <Minus size={14} />
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity((value) => Math.min(product.stock, value + 1))}
            >
              <Plus size={14} />
            </button>
          </div>
          <div className="cart-modal-summary">
            <span>Subtotal</span>
            <strong>{formatPrice(product.price * quantity, product.currency)}</strong>
          </div>
          <button
            type="button"
            className="product-cart-button"
            onClick={() => {
              addItem(product, quantity);
              setQuantity(1);
              setIsCartModalOpen(false);
            }}
          >
            <ShoppingCart size={16} />
            Add {quantity} to cart
          </button>
        </div>
      </Modal>
    </div>
  );
}
