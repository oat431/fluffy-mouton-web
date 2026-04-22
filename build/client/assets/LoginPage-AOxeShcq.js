import { n as useAuth } from "./AuthContext-cSC1Kn-t.js";
import { t as Section } from "./Section-sBf6xsXA.js";
import { n as login } from "./AuthService-Da_ztlUn.js";
import { Link, UNSAFE_withComponentProps, useNavigate } from "react-router";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/pages/LoginPage.tsx
var LoginPage_default = UNSAFE_withComponentProps(function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { login: login$1 } = useAuth();
	const navigate = useNavigate();
	const handleLogin = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await login({
				username,
				password
			});
			if (response.status === "SUCCESS" && response.data) {
				login$1(response.data.access_token, response.data.refresh_token);
				navigate("/profile");
			} else setError(response.error?.message ?? "Login succeeded but no token was returned.");
		} catch (err) {
			console.error("Login failed:", err);
			setError("Invalid username or password.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("fieldset", {
		className: "fieldset bg-base-200 border-base-300 rounded-box w-xs text-left border p-4",
		children: [
			/* @__PURE__ */ jsx("legend", {
				className: "fieldset-legend",
				children: "Login"
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: "alert alert-error text-sm mb-2 py-2",
				children: error
			}),
			/* @__PURE__ */ jsx("label", {
				className: "label",
				children: "Username"
			}),
			/* @__PURE__ */ jsx("input", {
				type: "text",
				className: "input",
				placeholder: "Username",
				value: username,
				onChange: (e) => setUsername(e.target.value),
				disabled: isLoading
			}),
			/* @__PURE__ */ jsx("label", {
				className: "label",
				children: "Password"
			}),
			/* @__PURE__ */ jsx("input", {
				type: "password",
				className: "input",
				placeholder: "Password",
				value: password,
				onChange: (e) => setPassword(e.target.value),
				disabled: isLoading,
				onKeyDown: (e) => {
					if (e.key === "Enter") handleLogin();
				}
			}),
			/* @__PURE__ */ jsx("button", {
				className: "btn btn-neutral mt-4",
				onClick: () => void handleLogin(),
				disabled: isLoading,
				children: isLoading ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner" }) : "Login"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-center mt-3",
				children: [
					"Don't have an account?",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/register",
						className: "link link-primary",
						children: "Register"
					})
				]
			})
		]
	}) });
});
//#endregion
export { LoginPage_default as default };
