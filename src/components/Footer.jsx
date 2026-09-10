import { Link } from "react-router-dom";
import { Coffee } from "lucide-react";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <div className="footer-logo">
            <Coffee size={24} />
            <span>Brew & Bite</span>
          </div>

          <p>
            Fresh coffee, delicious food and warm moments,
            made fresh every day.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>

          <Link to="/menu">Menu</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-links">
          <h3>Customer</h3>

          <Link to="/cart">Cart</Link>

          <Link to="/orders">My Orders</Link>
        </div>
<div className="footer-links">

  <h3>Legal</h3>

  <Link to="/privacy-policy">
    Privacy Policy
  </Link>

  <Link to="/terms">
    Terms & Conditions
  </Link>

</div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Brew & Bite. All rights reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;