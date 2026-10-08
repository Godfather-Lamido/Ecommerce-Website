import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Heart, Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import './Navbar.css';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Best Sellers', to: '/shop?sort=popular' },
  // { label: 'About', to: '/about' },
  // { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand">
          <img className="brand-logo" src="/images/logo1.png" alt="" />
          <span>E-Sharp</span>
        </Link>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                let active = isActive;
                if (item.to.includes('?')) {
                  active = `${location.pathname}${location.search}` === item.to;
                } else if (item.to === '/shop') {
                  active = (location.pathname === '/shop' && !location.search)
                    || location.pathname.startsWith('/category/');
                }
                return active ? 'nav-link active' : 'nav-link';
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-tools">
          <Link to="/search" className="nav-icon" aria-label="Search">
            <Search size={18} />
          </Link>

          <Link to="/account/wishlist" className="nav-icon wishlist-indicator" aria-label="Wishlist">
            <Heart size={18} />
            {wishlistItems.length > 0 && <span className="wishlist-count">{wishlistItems.length}</span>}
          </Link>

          <Link to="/cart" className="nav-icon cart-icon" aria-label="Cart">
            <ShoppingCart size={18} />
            {itemCount > 0 && <span>{itemCount}</span>}
          </Link>

          <Link to="/login" className="nav-account" aria-label="Account">
            <User size={18} />
          </Link>
        </div>

      {/* Mobile hamburger */}
      <button
        className='mobile-menu-button'
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className='mobile-menu'>
          <nav className="mobile-nav-links" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => {
                let active = isActive;
                if (item.to.includes('?')) {
                  active = `${location.pathname}${location.search}` === item.to;
                } else if (item.to === '/shop') {
                  active = (location.pathname === '/shop' && !location.search)
                    || location.pathname.startsWith('/category/');
                }
                return active ? 'mobile-nav-link active' : 'mobile-nav-link';
              }}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className='mobile-nav-tools'>
          <Link 
            to="/search" 
            className="nav-icon" 
            aria-label="Search"
            onClick={() => setMenuOpen(false)}
            >
            <Search size={18} />
          </Link>

          <Link 
            to="/account/wishlist" 
            className="nav-icon wishlist-indicator" 
            aria-label="Wishlist"
            onClick={() => setMenuOpen(false)}
            >
            <Heart size={18} />
            {wishlistItems.length > 0 && <span className="wishlist-count">{wishlistItems.length}</span>}
          </Link>

          <Link 
            to="/cart" 
            className="nav-icon cart-icon" 
            aria-label="Cart"
            onClick={() => setMenuOpen(false)}
            >
            <ShoppingCart size={18} />
            {itemCount > 0 && <span>{itemCount}</span>}
          </Link>

          <Link 
            to="/login" 
            className="nav-account" 
            aria-label="Account"
            onClick={() => setMenuOpen(false)}
            >
            <User size={18} />
          </Link>
        </div>
        
        </div>
      )}
      </div>
    </header>
  );
}
