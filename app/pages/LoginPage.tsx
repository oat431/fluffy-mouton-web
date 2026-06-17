import { useState } from "react";
import { Navigate } from "react-router";
import MainLayout from "../layouts/Section.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const getAuthUrl = () =>
    `https://gateway.panomete.com/oauth2/authorization/keycloak?redirect_uri=${encodeURIComponent(
        (typeof window !== "undefined" ? window.location.origin : "") + "/short-link"
    )}`;

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const [devToken, setDevToken] = useState("");
    const isDev = !import.meta.env.PROD;

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

    const handleDevToken = () => {
        const token = devToken.trim();
        if (!token) return;
        localStorage.setItem("jwt_token", token);
        window.location.href = "/short-link";
    };

    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-4 p-8">
                <h2 className="text-xl font-bold">Sign In</h2>

                {/* Production: OAuth2 redirect */}
                {!isDev && (
                    <>
                        <p className="text-base-content/70 text-center max-w-sm">
                            You'll be redirected to the central login page.
                        </p>
                        <button className="btn btn-primary" onClick={() => { window.location.href = getAuthUrl(); }}>
                            Sign in with Flowero Guard
                        </button>
                    </>
                )}

                {/* Dev: paste Keycloak token */}
                {isDev && (
                    <>
                        <p className="text-base-content/70 text-center max-w-sm">
                            Get a token from Keycloak and paste it below.
                        </p>
                        <textarea
                            className="textarea textarea-bordered text-xs font-mono h-24 w-full max-w-sm"
                            placeholder="Paste Keycloak access token..."
                            value={devToken}
                            onChange={(e) => setDevToken(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleDevToken} disabled={!devToken.trim()}>
                            Sign in with Token
                        </button>
                        <p className="text-xs text-base-content/40">
                            Get token: <code>curl -X POST https://auth.panomete.com/realms/flowerogate/protocol/openid-connect/token -d "grant_type=password" -d "client_id=service-shortlink" -d "client_secret=$SHORTLINK_SERVICE_SECRET" -d "username=panomete" -d "password=..."</code>
                        </p>
                    </>
                )}
            </div>
        </MainLayout>
    );
}
