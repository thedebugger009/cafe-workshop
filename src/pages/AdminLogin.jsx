import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { currentUser, authLoading, isAdmin } = useAuth();
  const navigate = useNavigate(); const location = useLocation();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  if (!authLoading && currentUser && isAdmin) return <Navigate to="/admin/dashboard" replace />;
  const submit = async (event) => { event.preventDefault(); setError(""); setLoading(true); try { const credential = await signInWithEmailAndPassword(auth, email, password); const token = await credential.user.getIdTokenResult(true); if (!token.claims.admin) { await signOut(auth); throw new Error("This account does not have administrator access."); } navigate(location.state?.from?.pathname || "/admin/dashboard", { replace: true }); } catch (caughtError) { setError(caughtError.message || "Unable to sign in."); } finally { setLoading(false); } };
  return <main className="auth-page"><div className="auth-card"><div className="auth-heading"><span>Staff only</span><h1>Admin Login</h1><p>Sign in with an administrator account.</p></div>{error && <div className="auth-error">{error}</div>}<form className="auth-form" onSubmit={submit}><div className="form-group"><label htmlFor="admin-email">Email</label><input id="admin-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></div><div className="form-group"><label htmlFor="admin-password">Password</label><input id="admin-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></div><button className="auth-button" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button></form></div></main>;
}
