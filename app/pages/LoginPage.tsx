import { useEffect } from "react";
import { Navigate } from "react-router";
import MainLayout from "../layouts/Section.tsx";
import { useAuth } from "../context/AuthContext.tsx";

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

    const handleLogin = () => {
        // In production: redirect to gateway OAuth2 endpoint
        if (import.meta.env.PROD) {
            window.location.href = "https://gateway.panomete.com/oauth2/authorization/keycloak";
            return;
        }
        // In local dev: show a prompt to get a Keycloak token manually
        // The API supports Bearer tokens via JWKS validation in dev mode
        window.location.href = "https://auth.panomete.com/realms/flowerogate/protocol/openid-connect/auth" +
            "?client_id=service-shortlink" +
            "&redirect_uri=" + encodeURIComponent(window.location.origin + "/short-link") +
            "&response_type=code" +
            "&scope=openid";
    };

    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-4 p-8">
                <h2 className="text-xl font-bold">Sign In</h2>
                <p className="text-base-content/70 text-center max-w-sm">
                    You'll be redirected to the central login page to sign in with your account.
                </p>
                <button className="btn btn-primary" onClick={handleLogin}>
                    Sign in with Flowero Guard
                </button>
            </div>
        </MainLayout>
    );
}
