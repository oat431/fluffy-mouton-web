import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function CatchAllRedirectPage() {
    const { isAuthenticated } = useAuth();
    return <Navigate to={isAuthenticated ? "/short-link" : "/login"} replace />;
}
