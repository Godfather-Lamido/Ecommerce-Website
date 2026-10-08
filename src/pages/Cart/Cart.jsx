import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import './Cart.css';

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (!items.length) {
    return (
      <div className="empty-state-card">
        <h2>Your cart is empty</h2>
        <p>Add a few essentials and come back here.</p>
        <Link to="/shop" className="primary-btn">Go shopping</Link>
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
              <img src={item.image} alt={item.name} className="cart-item-image" />

              <div className="cart-item-body">
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.categoryId}</p>
                </div>

                <div className="cart-item-row">
                  <div className="qty-control">
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>

                  <strong>{formatPrice(item.price * item.quantity, item.currency)}</strong>
                </div>
              </div>

              <button type="button" className="remove-item" onClick={() => removeItem(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        <aside className="summary-panel card">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal, items[0]?.currency)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{formatPrice(0, items[0]?.currency)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatPrice(subtotal, items[0]?.currency)}</strong>
          </div>
          <Link to="/checkout" className="primary-btn large-btn full-width">Proceed to checkout</Link>
        </aside>
      </div>
    </div>
  );
}
