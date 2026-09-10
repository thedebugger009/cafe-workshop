import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { clearCart } from "../redux/slices/cartSlice";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";

function Checkout() {
  const { items, totalItems, totalPrice } = useSelector((state) => state.cart);
  const { currentUser, authLoading } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ name: currentUser?.displayName || "", phone: "", email: currentUser?.email || "", orderType: "delivery", address: "", tableNumber: "", notes: "" });

  if (authLoading) return <main className="empty-cart"><p>Checking your account...</p></main>;
  if (!currentUser) return <Navigate to="/login" replace state={{ from: location }} />;
  if (!items.length) return <main className="empty-cart"><h1>No items to checkout</h1><p>Add some delicious items before continuing.</p><Link to="/menu" className="primary-button">Explore Menu</Link></main>;

  const handleChange = ({ target: { name, value } }) => setFormData((previous) => ({ ...previous, [name]: value }));
  const handleSubmit = async (event) => {
    event.preventDefault(); setError("");
    if (!formData.name.trim() || !formData.phone.trim()) return setError("Please enter your name and phone number.");
    if (formData.orderType === "delivery" && !formData.address.trim()) return setError("Please enter your delivery address.");
    if (formData.orderType === "dine-in" && !formData.tableNumber.trim()) return setError("Please enter your table number.");
    try {
      setSubmitting(true);
      await addDoc(collection(db, "orders"), { userId: currentUser.uid, userEmail: currentUser.email, customer: { ...formData, email: formData.email || currentUser.email }, items, totalItems, totalPrice, status: "Pending", createdAt: serverTimestamp() });
      dispatch(clearCart()); navigate("/orders");
    } catch (caughtError) { console.error("Error placing order:", caughtError); setError("Unable to place your order. Please try again."); } finally { setSubmitting(false); }
  };

  return <main className="checkout-page"><div className="checkout-container"><section className="checkout-form-section"><div className="checkout-heading"><span>Almost there</span><h1>Checkout</h1><p>Enter your details and review your order before placing it.</p></div>{error && <div className="auth-error">{error}</div>}<form className="checkout-form" onSubmit={handleSubmit}><div className="form-group"><label htmlFor="name">Full Name</label><input id="name" name="name" value={formData.name} onChange={handleChange} required /></div><div className="form-row"><div className="form-group"><label htmlFor="phone">Phone Number</label><input id="phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></div><div className="form-group"><label htmlFor="email">Email</label><input id="email" type="email" name="email" value={formData.email} onChange={handleChange} /></div></div><div className="form-group"><label>Order Type</label><div className="order-type-options">{[["delivery", "Delivery"], ["takeaway", "Takeaway"], ["dine-in", "Dine In"]].map(([value, label]) => <label key={value}><input type="radio" name="orderType" value={value} checked={formData.orderType === value} onChange={handleChange} />{label}</label>)}</div></div>{formData.orderType === "delivery" && <div className="form-group"><label htmlFor="address">Delivery Address</label><textarea id="address" name="address" rows="4" value={formData.address} onChange={handleChange} required /></div>}{formData.orderType === "dine-in" && <div className="form-group"><label htmlFor="tableNumber">Table Number</label><input id="tableNumber" name="tableNumber" value={formData.tableNumber} onChange={handleChange} required /></div>}<div className="form-group"><label htmlFor="notes">Order Notes <span>(Optional)</span></label><textarea id="notes" name="notes" rows="3" value={formData.notes} onChange={handleChange} /></div><button className="place-order-button" disabled={submitting}>{submitting ? "Placing order..." : "Place Order"}</button></form></section><aside className="checkout-summary"><h2>Your Order</h2><div className="checkout-products">{items.map((item) => <div className="checkout-product" key={item.id}><div><h4>{item.name}</h4><span>{item.quantity} × ₹{item.price}</span></div><strong>₹{item.quantity * item.price}</strong></div>)}</div><div className="checkout-summary-row"><span>Items</span><span>{totalItems}</span></div><div className="checkout-summary-row"><span>Subtotal</span><span>₹{totalPrice}</span></div><div className="checkout-summary-row"><span>Delivery</span><span>Free</span></div><div className="checkout-total"><span>Total</span><strong>₹{totalPrice}</strong></div></aside></div></main>;
}

export default Checkout;
