import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
//#region app/context/AuthContext.tsx
var AuthContext = createContext(void 0);
var AuthProvider = ({ children }) => {
	const [token, setToken] = useState(null);
	const [refreshToken, setRefreshToken] = useState(null);
	useEffect(() => {
		const storedToken = localStorage.getItem("jwt_token");
		const storedRefreshToken = localStorage.getItem("refresh_token");
		if (storedToken) setToken(storedToken);
		if (storedRefreshToken) setRefreshToken(storedRefreshToken);
	}, []);
	const login = (accessToken, newRefreshToken) => {
		setToken(accessToken);
		setRefreshToken(newRefreshToken);
		localStorage.setItem("jwt_token", accessToken);
		localStorage.setItem("refresh_token", newRefreshToken);
	};
	const logout = useCallback(() => {
		setToken(null);
		setRefreshToken(null);
		localStorage.removeItem("jwt_token");
		localStorage.removeItem("refresh_token");
	}, []);
	useEffect(() => {
		const handleUnauthorized = () => logout();
		window.addEventListener("auth-unauthorized", handleUnauthorized);
		return () => window.removeEventListener("auth-unauthorized", handleUnauthorized);
	}, [logout]);
	return /* @__PURE__ */ jsx(AuthContext.Provider, {
		value: {
			token,
			refreshToken,
			isAuthenticated: !!token,
			login,
			logout
		},
		children
	});
};
var useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
};
//#endregion
export { useAuth as n, AuthProvider as t };
