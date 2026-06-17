import { Navigate } from "react-router";
import MainLayout from "../layouts/Section.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const GATEWAY_AUTH_BASE = "https://gateway.panomete.com/oauth2/authorization/keycloak";
const GATEWAY_AUTH = `${GATEWAY_AUTH_BASE}?redirect_uri=${encodeURIComponent(window.location.origin + "/short-link")}`;

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/short-link" replace />;
    }

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center p-12">
                    <span className="loading loading-spinner loading-lg"></span>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-4 p-8">
                <h2 className="text-xl font-bold">Sign In</h2>
                <p className="text-base-content/70 text-center max-w-sm">
                    You'll be redirected to the central login page to sign in with your Flowero Guard account.
                    This gives you access to all flowerogate services.
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => { window.location.href = GATEWAY_AUTH; }}
                >
                    Sign in with Flowero Guard
                </button>
            </div>
        </MainLayout>
    );
}
