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
        navigate("/");
    }

    useEffect(() => {
        async function fetchStatus() {
            try {
                const data = await healthCheck() as string;
                console.log("API Status:", data);
                setStatus(data);
            } catch (_error) {
                setStatus(`Error: ${String(_error)}`);
            }
        }
        void fetchStatus();
    }, []);

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">Fluffy Mouton</Link>
                {status === 'OK' ? <span className="badge badge-sm badge-secondary">READY</span> : <span className="badge badge-sm badge-error">ERROR</span>}
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 items-center">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {isAuthenticated && <li><Link to="/dashboard">Dashboard</Link></li>}
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