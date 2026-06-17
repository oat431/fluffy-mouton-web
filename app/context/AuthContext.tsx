/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../utils/APIClient";

interface UserInfo {
    id: string;
    username: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: UserInfo | null;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getAuthUrl = () =>
    `https://gateway.panomete.com/oauth2/authorization/keycloak?redirect_uri=${encodeURIComponent(
        (typeof window !== "undefined" ? window.location.origin : "") + "/short-link"
    )}`;
const GATEWAY_LOGOUT_URL = "https://gateway.panomete.com/logout";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [user, setUser] = useState<UserInfo | null>(null);

    // Check auth status on mount by calling a protected endpoint
    useEffect(() => {
        let cancelled = false;

        const checkAuth = async () => {
            try {
                const response = await api.get("/short/");
                if (!cancelled && response.data?.status === "SUCCESS") {
                    setIsAuthenticated(true);
                }
            } catch {
                if (!cancelled) {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        checkAuth();
        return () => { cancelled = true; };
    }, []);

    // Also check for localStorage token (local dev / direct API mode)
    useEffect(() => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const login = useCallback(() => {
        window.location.href = getAuthUrl();
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("refresh_token");
        window.location.href = GATEWAY_LOGOUT_URL;
    }, []);

    // Listen for 401 events from APIClient
    useEffect(() => {
        const handleUnauthorized = () => {
            setIsAuthenticated(false);
            setUser(null);
        };
        window.addEventListener("auth-unauthorized", handleUnauthorized);
        return () => window.removeEventListener("auth-unauthorized", handleUnauthorized);
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
