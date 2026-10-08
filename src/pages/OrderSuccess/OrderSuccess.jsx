import { Link, useParams } from 'react-router-dom';

export default function OrderSuccessPage() {
  const { orderId } = useParams();

  return (
    <div className="empty-state-card success-card">
      <h2>Payment successful</h2>
      <p>Your order has been placed successfully.</p>
      <p className="order-id">Order ID: {orderId}</p>
      <Link to="/track-order" className="primary-btn">Track order</Link>
    </div>
  );
}
