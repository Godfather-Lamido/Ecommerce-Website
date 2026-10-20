
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../data/products';

import './Cart.css';

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
  } = useCart();

  function handleCheckout() {
    if (!isAuthenticated) {
      navigate('/register', {
        state: {
          from: {
            pathname: '/cart',
          },
        },
      });

      return;
    }

    navigate('/checkout');
  }

  if (!items.length) {
    return (
      <div className="empty-state-card">
        <h2>Your cart is empty</h2>
        <p>Add a few essentials and come back here.</p>

        <Link to="/shop" className="primary-btn">
          Go shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <header className="page-header">
        <h1>Your cart</h1>
        <p>{items.length} item(s) ready for checkout.</p>
      </header>

      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-item card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-body">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.categoryId}</p>
                </div>

                <div className="cart-item-row">
                  <div className="qty-control">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${item.name}`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      <Minus size={14} />
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      aria-label={`Increase quantity of ${item.name}`}
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <strong>
                    {formatPrice(
                      item.price * item.quantity,
                      item.currency
                    )}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="remove-item"
                aria-label={`Remove ${item.name} from cart`}
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <aside className="summary-panel card">
          <h3>Order summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>
              {formatPrice(subtotal, items[0]?.currency)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <strong>
              {formatPrice(0, items[0]?.currency)}
            </strong>
          </div>

          <div className="summary-row total">
            <span>Total</span>
            <strong>
              {formatPrice(subtotal, items[0]?.currency)}
            </strong>
          </div>

          <button
            type="button"
            className="primary-btn large-btn full-width"
            onClick={handleCheckout}
          >
            Proceed to checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
