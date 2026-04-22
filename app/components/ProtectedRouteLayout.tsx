import { Outlet, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRouteLayout() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return <Outlet />;
}
