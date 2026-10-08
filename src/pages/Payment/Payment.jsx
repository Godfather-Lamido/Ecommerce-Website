import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import './Payment.css';

export default function PaymentPage() {
  const { subtotal, items, clearCart } = useCart();

  const handleSubmit = () => {
    clearCart();
  };

  return (
    <div className="payment-page">
      <header className="page-header">
        <h1>Payment</h1>
        <p>Complete your secure purchase.</p>
      </header>

      <div className="payment-layout">
        <section className="card payment-card">
          <h2>Card details</h2>
          <form className="checkout-form">
            <label>
              Cardholder name
              <input type="text" defaultValue="Jane Doe" />
            </label>
            <label>
              Card number
              <input type="text" defaultValue="4242 4242 4242 4242" />
            </label>
            <div className="form-grid">
              <label>
                Expiry
                <input type="text" defaultValue="09/29" />
              </label>
              <label>
                CVV
                <input type="text" defaultValue="123" />
              </label>
            </div>
          </form>
        </section>

        <aside className="card payment-summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal, items[0]?.currency)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <strong>{formatPrice(0, items[0]?.currency)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatPrice(subtotal, items[0]?.currency)}</strong>
          </div>
          <Link to="/order-success/ORD-1001" className="primary-btn large-btn full-width" onClick={handleSubmit}>
            Pay now
          </Link>
        </aside>
      </div>
    </div>
  );
}
