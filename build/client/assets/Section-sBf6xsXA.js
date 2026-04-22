import { n as useAuth } from "./AuthContext-cSC1Kn-t.js";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import axios from "axios";
//#region app/components/Footer.tsx
function Footer() {
	return /* @__PURE__ */ jsx("footer", {
		className: "footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4",
		children: /* @__PURE__ */ jsx("aside", { children: /* @__PURE__ */ jsxs("p", { children: [
			"Copyright © ",
			(/* @__PURE__ */ new Date()).getFullYear(),
			" - All right reserved by Flowero Oralita Panomete"
		] }) })
	});
}
//#endregion
//#region app/utils/APIClient.ts
var api = axios.create({
	baseURL: "http://localhost:8004/api/v1",
	headers: { "Content-Type": "application/json" }
});
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("jwt_token");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
}, (error) => {
	return Promise.reject(error);
});
api.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response && error.response.status === 401) {
		console.error("Unauthorized! Token may be expired.");
		window.dispatchEvent(new Event("auth-unauthorized"));
	}
	return Promise.reject(error);
});
//#endregion
//#region app/services/HealthCheckService.ts
async function healthCheck() {
	return (await api.get("/health/check")).data;
}
//#endregion
//#region app/components/NavBar.tsx
function NavBar() {
	const { isAuthenticated, logout } = useAuth();
	const navigate = useNavigate();
	const [status, setStatus] = useState("Checking... ");
	const handleLogout = () => {
		logout();
		navigate("/");
	};
	useEffect(() => {
		async function fetchStatus() {
			try {
				const data = await healthCheck();
				console.log("API Status:", data);
				setStatus(data);
			} catch (_error) {
				setStatus(`Error: ${String(_error)}`);
			}
		}
		fetchStatus();
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "navbar bg-base-100 shadow-sm",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ jsx(Link, {
				to: "/",
				className: "btn btn-ghost text-xl",
				children: "Fluffy Mouton"
			}), status === "OK" ? /* @__PURE__ */ jsx("span", {
				className: "badge badge-sm badge-secondary",
				children: "READY"
			}) : /* @__PURE__ */ jsx("span", {
				className: "badge badge-sm badge-error",
				children: "ERROR"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex-none",
			children: /* @__PURE__ */ jsxs("ul", {
				className: "menu menu-horizontal px-1 items-center",
				children: [
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/about",
						children: "About"
					}) }),
					/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/contact",
						children: "Contact"
					}) }),
					isAuthenticated && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/profile",
						children: "Profile"
					}) }),
					isAuthenticated && /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/short-link",
						children: "Short Link"
					}) }),
					!isAuthenticated ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
						to: "/login",
						className: "btn btn-sm btn-primary ml-2",
						children: "Login"
					}) }) : /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", {
						onClick: handleLogout,
						className: "btn btn-sm btn-outline ml-2",
						children: "Logout"
					}) })
				]
			})
		})]
	});
}
//#endregion
//#region app/layouts/Section.tsx
function Section({ children }) {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(NavBar, {}),
		/* @__PURE__ */ jsx("div", {
			className: "hero bg-base-200 min-h-screen",
			children: /* @__PURE__ */ jsx("div", {
				className: "hero-content text-center",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-md",
					children
				})
			})
		}),
		/* @__PURE__ */ jsx(Footer, {})
	] });
}
//#endregion
export { api as n, Section as t };
