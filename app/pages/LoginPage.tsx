import { useState } from "react";
import { Navigate } from "react-router";
import MainLayout from "../layouts/Section.tsx";
import { useAuth } from "../context/AuthContext.tsx";

const GATEWAY_AUTH = "https://gateway.panomete.com/oauth2/authorization/keycloak";

export default function LoginPage() {
    const { isAuthenticated, isLoading } = useAuth();
    const [devToken, setDevToken] = useState("");

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
        window.location.href = GATEWAY_AUTH;
    };

    const handleDevToken = () => {
        const token = devToken.trim();
        if (!token) return;
        localStorage.setItem("jwt_token", token);
        window.location.href = "/short-link";
    };

    const isDev = !import.meta.env.PROD;

    return (
        <MainLayout>
            <div className="flex flex-col items-center gap-4 p-8">

                {/* Production: redirect to gateway */}
                <h2 className="text-xl font-bold">Sign In</h2>
                <p className="text-base-content/70 text-center max-w-sm">
                    Sign in with your Flowero Guard account to access all services.
                </p>
                <button className="btn btn-primary" onClick={handleLogin}>
                    Sign in with Flowero Guard
                </button>

                {/* Local dev: manual token input */}
                {isDev && (
                    <>
                        <div className="divider text-sm text-base-content/40">or paste a token (dev)</div>
                        <div className="flex flex-col gap-2 w-full max-w-sm">
                            <textarea
                                className="textarea textarea-bordered text-xs font-mono h-24"
                                placeholder="Paste Keycloak access token here..."
                                value={devToken}
                                onChange={(e) => setDevToken(e.target.value)}
                            />
                            <button
                                className="btn btn-sm btn-outline"
                                onClick={handleDevToken}
                                disabled={!devToken.trim()}
                            >
                                Use Dev Token
                            </button>
                            <p className="text-xs text-base-content/40 text-center">
                                Get a token via curl:<br />
                                <code className="text-[10px] break-all">
                                    curl -X POST {window.location.protocol}//auth.panomete.com/realms/flowerogate/protocol/openid-connect/token ...
                                </code>
                            </p>
                        </div>
                    </>
                )}
            </div>
        </MainLayout>
    );
}
