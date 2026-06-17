/* eslint-disable @typescript-eslint/no-floating-promises */
import { Link, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import { healthCheck } from "../services/HealthCheckService";

function NavBar() {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const [status, setStatus] = useState<string>("Checking... ");

    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    useEffect(() => {
        // Health check requires auth through the gateway.
        // Only check when user is authenticated.
        if (!isAuthenticated) {
            setStatus("🔒");
            return;
        }
        async function fetchStatus() {
            try {
                const data = await healthCheck() as string;
                console.log("API Status:", data);
                setStatus(data);
            } catch {
                setStatus("Error");
            }
        }
        void fetchStatus();
    }, [isAuthenticated]);

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to={isAuthenticated ? "/short-link" : "/login"} className="btn btn-ghost text-xl">Fluffy Mouton</Link>
                {status === 'OK' ? <span className="badge badge-sm badge-success">OK</span> : status === '🔒' ? <span className="badge badge-sm badge-ghost">🔒</span> : <span className="badge badge-sm badge-error">DOWN</span>}
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 items-center">
                    {isAuthenticated && <li><Link to="/profile">Profile</Link></li>}
                    {isAuthenticated && <li><Link to="/short-link">Short Link</Link></li>}
                    {!isAuthenticated ? (
                        <li><Link to="/login" className="btn btn-sm btn-primary ml-2">Login</Link></li>
                    ) : (
                        <li><button onClick={handleLogout} className="btn btn-sm btn-outline ml-2">Logout</button></li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default NavBar