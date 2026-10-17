import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) return null;

  const isAdmin = user?.role?.trim().toLowerCase() === "admin";

  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
