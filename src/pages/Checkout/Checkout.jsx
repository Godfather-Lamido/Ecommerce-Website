import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import './Checkout.css';

export default function CheckoutPage() {
  const { subtotal, items } = useCart();

  return (
    <div className="checkout-page">
      <header className="page-header">
        <h1>Checkout</h1>
        <p>Review your order and complete payment.</p>
      </header>

      <div className="checkout-layout">
        <section className="checkout-card card">
          <h2>Delivery details</h2>
          <form className="checkout-form">
            <div className="form-grid">
              <label>
                Full name
                <input type="text" defaultValue="Jane Doe" />
              </label>
              <label>
                Phone number
                <input type="tel" defaultValue="0803 123 4567" />
              </label>
              <label className="full-width">
                Address
                <input type="text" defaultValue="12 Lekki Phase 1, Lagos" />
              </label>
              <label>
                City
                <input type="text" defaultValue="Lagos" />
              </label>
              <label>
                State
                <input type="text" defaultValue="Lagos" />
              </label>
            </div>
          </form>
        </section>

        <aside className="checkout-summary card">
          <h2>Order summary</h2>
          {items.map((item) => (
            <div className="mini-order-row" key={item.id}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>{formatPrice(item.price * item.quantity, item.currency)}</strong>
            </div>
          ))}
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatPrice(subtotal, items[0]?.currency)}</strong>
          </div>
          <Link to="/payment" className="primary-btn large-btn full-width">Continue to payment</Link>
        </aside>
      </div>
    </div>
  );
}
