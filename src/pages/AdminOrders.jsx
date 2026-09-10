import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import AdminHeader from "../components/AdminHeader";

const statuses = ["Pending", "Confirmed", "Preparing", "Ready", "Delivered", "Cancelled"];

export default function AdminOrders({ dashboard = false }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  useEffect(() => onSnapshot(query(collection(db, "orders"), orderBy("createdAt", "desc")), (snapshot) => {
    setOrders(snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() })));
    setLoading(false);
  }, (caughtError) => { setError(caughtError.message); setLoading(false); }), []);
  const updateStatus = async (id, status) => { try { await updateDoc(doc(db, "orders", id), { status }); } catch (caughtError) { setError(caughtError.message); } };
  const visible = dashboard ? orders.slice(0, 5) : orders.filter((order) => filter === "All" || order.status === filter);
  if (loading) return <main className="empty-orders"><p>Loading orders...</p></main>;
  return <main className="admin-page"><div className="admin-container">
    <AdminHeader title={dashboard ? "Dashboard" : "Orders"} />
    {error && <div className="auth-error">{error}</div>}
    {!dashboard && <label className="admin-filter">Filter status <select value={filter} onChange={(event) => setFilter(event.target.value)}><option>All</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>}
    {dashboard && <div className="admin-stats"><div><strong>{orders.length}</strong><span>Total orders</span></div>{statuses.slice(0, 5).map((status) => <div key={status}><strong>{orders.filter((order) => order.status === status).length}</strong><span>{status}</span></div>)}</div>}
    <div className="admin-orders">{visible.length ? visible.map((order) => <article className="admin-order" key={order.id}><div><Link to={`/admin/orders/${order.id}`}><strong>#{order.id.slice(0, 8)}</strong></Link><p>{order.customer?.name || "Customer"} · {order.userEmail}</p><small>{order.createdAt?.toDate?.().toLocaleString() || "Just now"} · {order.totalItems || 0} items · ₹{order.totalPrice || 0}</small></div><div className="admin-order-actions"><select aria-label={`Status for order ${order.id}`} value={order.status || "Pending"} onChange={(event) => updateStatus(order.id, event.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select>{order.status !== "Cancelled" && <button onClick={() => updateStatus(order.id, "Cancelled")}>Cancel</button>}</div></article>) : <p>No orders match this view.</p>}</div>
    {dashboard && orders.length > 5 && <Link className="primary-button" to="/admin/orders">View all orders</Link>}
  </div></main>;
}
