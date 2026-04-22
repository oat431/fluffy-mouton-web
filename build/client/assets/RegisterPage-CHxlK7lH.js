import { t as Section } from "./Section-sBf6xsXA.js";
import { r as register } from "./AuthService-Da_ztlUn.js";
import { Link, UNSAFE_withComponentProps, useNavigate } from "react-router";
import { useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region app/pages/RegisterPage.tsx
var RegisterPage_default = UNSAFE_withComponentProps(function RegisterPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState(null);
	const navigate = useNavigate();
	const handleRegister = async () => {
		setIsLoading(true);
		setError(null);
		setSuccessMessage(null);
		try {
			const response = await register({
				username,
				email,
				password
			});
			if (response.status === "SUCCESS" && response.data) {
				setSuccessMessage(`Account created! A verification email has been sent to ${response.data.email}. Redirecting to login...`);
				setTimeout(() => navigate("/login"), 3e3);
			} else setError(response.error?.message ?? "Registration failed. Please try again.");
		} catch (err) {
			console.error("Register failed:", err);
			setError("Registration failed. Username or email may already be taken.");
		} finally {
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsxs("fieldset", {
		className: "fieldset bg-base-200 border-base-300 rounded-box w-xs text-left border p-4",
		children: [
			/* @__PURE__ */ jsx("legend", {
				className: "fieldset-legend",
				children: "Create Account"
			}),
			error && /* @__PURE__ */ jsx("div", {
				className: "alert alert-error text-sm mb-2 py-2",
				children: error
			}),
			successMessage && /* @__PURE__ */ jsx("div", {
				className: "alert alert-success text-sm mb-2 py-2",
				children: successMessage
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
				disabled: isLoading || !!successMessage
			}),
			/* @__PURE__ */ jsx("label", {
				className: "label",
				children: "Email"
			}),
			/* @__PURE__ */ jsx("input", {
				type: "email",
				className: "input",
				placeholder: "you@example.com",
				value: email,
				onChange: (e) => setEmail(e.target.value),
				disabled: isLoading || !!successMessage
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
				disabled: isLoading || !!successMessage,
				onKeyDown: (e) => {
					if (e.key === "Enter") handleRegister();
				}
			}),
			/* @__PURE__ */ jsx("button", {
				className: "btn btn-neutral mt-4",
				onClick: () => void handleRegister(),
				disabled: isLoading || !!successMessage,
				children: isLoading ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner" }) : "Register"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-center mt-3",
				children: [
					"Already have an account?",
					" ",
					/* @__PURE__ */ jsx(Link, {
						to: "/login",
						className: "link link-primary",
						children: "Login"
					})
				]
			})
		]
	}) });
});
//#endregion
export { RegisterPage_default as default };
