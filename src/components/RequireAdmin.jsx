import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RequireAdmin({ children }) {
  const { currentUser, authLoading, isAdmin } = useAuth();
  const location = useLocation();
  if (authLoading) return <main className="empty-orders"><p>Checking administrator access...</p></main>;
  if (!currentUser || !isAdmin) return <Navigate to="/admin/login" replace state={{ from: location }} />;
  return children;
}
