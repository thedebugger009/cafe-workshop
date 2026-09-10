import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

export default function AdminHeader({ title, eyebrow = "Admin panel", children }) {
  const navigate = useNavigate();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const logout = async () => {
    try { setLoading(true); await signOut(auth); navigate("/admin/login", { replace: true }); }
    finally { setLoading(false); setConfirming(false); }
  };
  return <><div className="admin-header"><div><span>{eyebrow}</span><h1>{title}</h1>{children}</div><nav><Link to="/admin/dashboard">Dashboard</Link><Link to="/admin/orders">All orders</Link><button className="admin-logout-button" onClick={() => setConfirming(true)}><LogOut size={16} />Logout</button></nav></div>{confirming && <div className="logout-modal-overlay"><div className="logout-modal"><div className="logout-modal-icon"><LogOut size={28} /></div><h2>Logout</h2><p>Are you sure you want to logout from the admin panel?</p><div className="logout-modal-actions"><button className="logout-cancel-button" onClick={() => setConfirming(false)}>Cancel</button><button className="logout-confirm-button" disabled={loading} onClick={logout}>{loading ? "Logging out..." : "Yes, Logout"}</button></div></div></div>}</>;
}
