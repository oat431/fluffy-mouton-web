/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/prefer-promise-reject-errors */
import axios from "axios";

// In production: calls https://gateway.panomete.com/api/v1 directly.
// In dev: Vite proxy forwards /api/* to the gateway, so use relative path.
const baseURL: string =
    (import.meta.env.FLUMOU_API_URL as string) ||
    (import.meta.env.DEV ? "/api/v1" : "https://gateway.panomete.com/api/v1");

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Send session cookie (needed for gateway auth)
});

// Interceptor: attach Bearer token for local dev / direct API access
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwt_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor: handle 401 by clearing state
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized! Token may be expired.");
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("refresh_token");
            window.dispatchEvent(new Event("auth-unauthorized"));
        }
        return Promise.reject(error);
    }
);

export default api;
