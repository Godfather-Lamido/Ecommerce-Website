import NavBar from "../navbar/Navbar";
import {
  ShoppingCart,
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      {/* Logo */}
      <div className="logo-section">
        <img
          className="logo"
          src="/images/logo1.png"
          alt="E-Sharp Logo"
        />

        <h1>E-Sharp</h1>
      </div>

      {/* Navigation */}
      <NavBar />

      {/* Search + Actions */}
      <div className="nav-actions">
        <form className="search-form">
          <input
            type="text"
            placeholder="Search products..."
            className="search-bar"
          />

          <button type="submit" className="search-button">
            <Search size={19} />
          </button>
        </form>

        <button className="icon-background" aria-label="Shopping cart">
          <ShoppingCart size={19} />
          <span className="cart-count">2</span>
        </button>

        <button className="icon-background" aria-label="Notifications">
          <Bell size={19} />
          <span className="notification-dot"></span>
        </button>
      </div>

      {/* Profile */}
      <div className="profile-section">
        <img
          className="profile-picture"
          src="/images/profile.png"
          alt="John Doe"
        />

        <div className="profile-info">
          <span className="profile-greeting">Welcome back</span>
          <span className="profile-name">John Doe</span>
        </div>

        <ChevronDown className="profile-chevron" size={17} />
      </div>
    </header>
  );
}