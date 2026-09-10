import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import AdminHeader from "../components/AdminHeader";
const statuses = ["Pending", "Confirmed", "Preparing", "Ready", "Delivered", "Cancelled"];
export default function AdminOrderDetail() {
  const { id } = useParams(); const [order, setOrder] = useState(null); const [error, setError] = useState("");
  useEffect(() => onSnapshot(doc(db, "orders", id), (snapshot) => setOrder(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null), (caughtError) => setError(caughtError.message)), [id]);
  if (error) return <main className="empty-orders"><p>{error}</p></main>; if (!order) return <main className="empty-orders"><p>Loading order...</p></main>;
  return <main className="admin-page"><div className="admin-container"><Link to="/admin/orders">← Back to orders</Link><AdminHeader eyebrow="Order details" title={`#${order.id}`}><p>{order.createdAt?.toDate?.().toLocaleString() || "Just now"}</p></AdminHeader><select className="admin-status-select" value={order.status || "Pending"} onChange={(event) => updateDoc(doc(db, "orders", id), { status: event.target.value })}>{statuses.map((status) => <option key={status}>{status}</option>)}</select><section className="admin-detail"><h2>Customer</h2><p>{order.customer?.name} · {order.userEmail}</p><p>{order.customer?.phone}</p><p>{order.customer?.orderType}{order.customer?.address ? ` · ${order.customer.address}` : ""}{order.customer?.tableNumber ? ` · Table ${order.customer.tableNumber}` : ""}</p><h2>Items</h2>{order.items?.map((item) => <p key={item.id}>{item.quantity} × {item.name} — ₹{item.quantity * item.price}</p>)}<h2>Total: ₹{order.totalPrice}</h2></section></div></main>;
}
