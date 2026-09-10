import { Link } from "react-router-dom";
import { ShoppingBag, User } from "lucide-react";
import { useSelector } from "react-redux";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const totalItems = useSelector(
    (state) => state.cart.totalItems
  );

  const { currentUser } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          Brew & Bite
        </Link>

        <nav className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/menu">Menu</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

          {currentUser && (
            <Link to="/orders">
              My Orders
            </Link>
          )}
        </nav>

        <div className="navbar-actions">

          {!currentUser ? (
            <>
              <Link
                to="/login"
                className="login-button"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="register-button"
              >
                Register
              </Link>
            </>
          ) : (
            <Link
              to="/profile"
              className="profile-button"
            >
              <User size={18} />

              <span>{currentUser.displayName || "Profile"}</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="cart-button"
          >
            <ShoppingBag size={20} />

            <span>Cart</span>

            {totalItems > 0 && (
              <span className="cart-count">
                {totalItems}
              </span>
            )}
          </Link>

        </div>

      </div>
    </header>
  );
}

export default Navbar;
