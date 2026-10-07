import './Navbar.css';
import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <>
      <nav className="nav-section">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/collection">Collection</NavLink>
        <NavLink to="/sale">Sale</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/faqs">FAQs</NavLink>
      </nav>
    </>
  );
}
