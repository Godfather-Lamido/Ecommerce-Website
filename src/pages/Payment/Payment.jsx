// import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../data/products';
import PaystackPop from '@paystack/inline-js';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

export default function PaymentPage() {
  const navigate = useNavigate();
  const { subtotal, items } = useCart();

const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

// Get customer details saved during checkout
  const savedCustomer = localStorage.getItem("customer");

    const customer = savedCustomer
    ? JSON.parse(savedCustomer)
    : null;

  // / Only extract the details Paystack needs
  const fullName = customer?.fullName || "";
  const email = customer?.email || "";
  const phone = customer?.phone || "";

    const handleSubmit = () => {

    // Check Paystack Public Key
    if (!publicKey) {
    console.error("Paystack public key is missing.");
    return;
  }

    // Check Customer details
      if (!fullName || !email || !phone) {
      console.error("Customer details are missing.");
      return;
    }

    // Check order total
    if (subtotal <= 0) {
      console.error("Order total must be greater than zero.");
      return;
    }

  const paystack = new PaystackPop();

  paystack.newTransaction({
    key: publicKey,
    email: customer.email,
    amount: Math.round(subtotal * 100),
    currency: "NGN",

    firstName: customer.fullName?.split(" ")[0],
    phone: customer.phone,

    reference: `ESHARP-${Date.now()}`,

    onSuccess: (transaction) => {
      console.log("Paystack returned:", transaction.reference);

      // Frontend demonstration only.
      // This does not independently verify payment.
      navigate(
        `/order-success/${transaction.reference}`
      );
    },

    onCancel: () => {
      console.log("Payment cancelled.");
    },

    onError: (error) => {
      console.error("Paystack error:", error.message);
    },
  });
};

  return (
    <div className="payment-page">
      <header className="page-header">
        <h1>Payment</h1>
        <p>Complete your secure purchase.</p>
      </header>

      <div className="payment-layout">
        <section className="card payment-card">
          <h2>Payment details</h2>
          <form className="checkout-form">
            <label>
              Customer name
              <input 
                type="text"
                value={fullName}
                readOnly
              />
            </label>
            <label>
              Email
              <input 
                type="text" 
                value={email} 
                readOnly
              />
            </label>
            <label>
              Phone Number
              <input 
                type="tel" 
                value={phone} 
                readOnly
              />
            </label>
            {/* <div className="form-grid">
              <label>
                Expiry
                <input type="text" defaultValue="09/29" />
              </label>
              <label>
                CVV
                <input type="text" defaultValue="123" />
              </label>
            </div> */}
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
          {/* <Link to="/order-success/ORD-1001" className="primary-btn large-btn full-width" onClick={handleSubmit}>
            Pay now
          </Link> */}
          <button
              type="button"
              className="primary-btn large-btn full-width"
              onClick={handleSubmit}
            >
            Pay now
          </button>
        </aside>
      </div>
    </div>
  );
}
