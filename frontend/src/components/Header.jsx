import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import MobileLogo from '../assets/mobile-logo.png';
import CartIcon from '../assets/icons/cart-icon.png';
import './Header.css';

export function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-a">
          <img className="logo" src={Logo} alt="Logo" />
          <img className="mobile-logo" src={MobileLogo} alt="logo" />
        </Link>
      </div>

      <div className="middle-section">
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>

        <div className="dropdown me-2" ref={dropdownRef}>
          <button
            className="btn btn-outline-success dropdown-toggle"
            type="button"
            onClick={() => setDropdownOpen(prev => !prev)}
          >
            Pages
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu show">
              <li><Link className="dropdown-item" to="/shop" onClick={() => setDropdownOpen(false)}>Shop</Link></li>
              <li><Link className="dropdown-item" to="/cart" onClick={() => setDropdownOpen(false)}>Cart</Link></li>
              <li><Link className="dropdown-item" to="/products/1" onClick={() => setDropdownOpen(false)}>Product Detail</Link></li>
              <li><Link className="dropdown-item" to="/about-us" onClick={() => setDropdownOpen(false)}>About Us</Link></li>
              <li><Link className="dropdown-item" to="/payment" onClick={() => setDropdownOpen(false)}>Payment</Link></li>
            </ul>
          )}
        </div>
      </div>

      <div className="right-section">
        <Link className="cart-link header-link" to="/cart">
          <img className="cart-icon" src={CartIcon} alt="Cart" />
          <div className="cart-quantity">1</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}
