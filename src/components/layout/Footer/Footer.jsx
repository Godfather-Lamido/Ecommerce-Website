import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h3>E-Sharp</h3>
          <p>Modern essentials for everyday living.</p>
        </div>

        <div>
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Customer service</h4>
          <ul>
            <li><Link to="/track-order">Track order</Link></li>
            <li><Link to="/account/orders">Orders</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4>Legal</h4>
          <ul>
            <li><Link to="/about">Privacy</Link></li>
            <li><Link to="/about">Terms</Link></li>
            <li><Link to="/about">Support</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-base">© 2026 E-Sharp. All rights reserved.</div>
    </footer>
  );
}
