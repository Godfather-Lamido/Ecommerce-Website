import { Link } from 'react-router-dom';

export default function TrackOrderPage() {
  return (
    <div className="page-shell narrow-shell">
      <header className="page-header">
        <h1>Track order</h1>
        <p>Follow the status of your shipment in real time.</p>
      </header>

      <div className="card info-card">
        <h2>Order #ORD-1001</h2>
        <ul className="tracking-list">
          <li>Order placed</li>
          <li>Confirmed by seller</li>
          <li>Shipped</li>
          <li>Out for delivery</li>
        </ul>
        <Link to="/shop" className="primary-btn">Continue shopping</Link>
      </div>
    </div>
  );
}
