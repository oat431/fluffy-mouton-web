import { t as Section } from "./Section-sBf6xsXA.js";
import { a as verifyEmail } from "./AuthService-Da_ztlUn.js";
import { Link, UNSAFE_withComponentProps } from "react-router";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region app/pages/VerifyEmailPage.tsx
var VerifyEmailPage_default = UNSAFE_withComponentProps(function VerifyEmailPage() {
	const [state, setState] = useState("loading");
	const [message, setMessage] = useState("");
	useEffect(() => {
		const token = new URLSearchParams(window.location.search).get("token");
		if (!token) {
			setState("error");
			setMessage("No verification token provided in the URL.");
			return;
		}
		async function verify() {
			try {
				const response = await verifyEmail(token);
				if (response.status === "SUCCESS") {
					setState("success");
					setMessage(typeof response.data === "string" ? response.data : "Email verified successfully!");
				} else {
					setState("error");
					setMessage(response.error?.message ?? "Verification failed.");
				}
			} catch {
				setState("error");
				setMessage("Invalid or expired verification token.");
			}
		}
		verify();
	}, []);
	return /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx("div", {
		className: "card bg-base-100 shadow-xl border border-base-300 w-full max-w-sm mx-auto mt-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "card-body items-center text-center gap-4",
			children: [
				state === "loading" && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-lg text-primary" }), /* @__PURE__ */ jsx("p", {
					className: "text-base-content/70",
					children: "Verifying your email..."
				})] }),
				state === "success" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-success text-6xl",
						children: "✓"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold text-success",
						children: "Email Verified!"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-base-content/70",
						children: message
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/login",
						className: "btn btn-primary mt-2",
						children: "Go to Login"
					})
				] }),
				state === "error" && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-error text-6xl",
						children: "✗"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "text-xl font-bold text-error",
						children: "Verification Failed"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-base-content/70",
						children: message
					}),
					/* @__PURE__ */ jsx(Link, {
						to: "/login",
						className: "btn btn-neutral mt-2",
						children: "Back to Login"
					})
				] })
			]
		})
	}) });
});
//#endregion
export { VerifyEmailPage_default as default };
