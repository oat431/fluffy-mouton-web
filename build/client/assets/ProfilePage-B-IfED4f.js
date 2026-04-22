import { n as useAuth } from "./AuthContext-cSC1Kn-t.js";
import { t as Section } from "./Section-sBf6xsXA.js";
import { i as revokeAccess, t as getUserDetail } from "./AuthService-Da_ztlUn.js";
import { UNSAFE_withComponentProps, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region app/pages/ProfilePage.tsx
var ProfilePage_default = UNSAFE_withComponentProps(function ProfilePage() {
	const { refreshToken, logout } = useAuth();
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await getUserDetail();
				if (response.status === "SUCCESS" && response.data) setUser(response.data);
				else setError(response.error?.message ?? "Failed to load user details.");
			} catch {
				setError("Failed to load user details.");
			} finally {
				setIsLoading(false);
			}
		}
		fetchUser();
	}, []);
	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			if (refreshToken) await revokeAccess({ refresh_token: refreshToken });
		} catch {} finally {
			logout();
			navigate("/login");
		}
	};
	return /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx("div", {
		className: "card bg-base-100 shadow-xl border border-base-300 w-full max-w-lg mx-auto mt-8",
		children: /* @__PURE__ */ jsxs("div", {
			className: "card-body gap-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "card-title text-2xl",
						children: "My Profile"
					}), /* @__PURE__ */ jsx("button", {
						className: "btn btn-error btn-sm",
						onClick: () => void handleLogout(),
						disabled: isLoggingOut,
						children: isLoggingOut ? /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-xs" }) : "Logout"
					})]
				}),
				isLoading && /* @__PURE__ */ jsx("div", {
					className: "flex justify-center py-8",
					children: /* @__PURE__ */ jsx("span", { className: "loading loading-spinner loading-lg" })
				}),
				error && !isLoading && /* @__PURE__ */ jsx("div", {
					className: "alert alert-error",
					children: error
				}),
				user && !isLoading && /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center gap-3 py-4",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "avatar placeholder",
								children: /* @__PURE__ */ jsx("div", {
									className: "bg-neutral text-neutral-content w-20 rounded-full text-3xl font-bold",
									children: /* @__PURE__ */ jsx("span", { children: user.username.charAt(0).toUpperCase() })
								})
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-xl font-semibold",
								children: user.username
							}),
							/* @__PURE__ */ jsx("span", {
								className: `badge ${user.is_verified ? "badge-success" : "badge-warning"}`,
								children: user.is_verified ? "✓ Verified" : "⚠ Not Verified"
							})
						]
					}),
					/* @__PURE__ */ jsx("div", { className: "divider my-0" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-base-content/60 uppercase font-semibold tracking-wide",
									children: "User ID"
								}), /* @__PURE__ */ jsx("code", {
									className: "text-sm bg-base-200 px-3 py-2 rounded-lg break-all",
									children: user.id
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-base-content/60 uppercase font-semibold tracking-wide",
									children: "Username"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm bg-base-200 px-3 py-2 rounded-lg",
									children: user.username
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-base-content/60 uppercase font-semibold tracking-wide",
									children: "Email"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm bg-base-200 px-3 py-2 rounded-lg",
									children: user.email
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-xs text-base-content/60 uppercase font-semibold tracking-wide",
									children: "Email Status"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-sm bg-base-200 px-3 py-2 rounded-lg",
									children: user.is_verified ? "Verified" : "Pending verification — check your inbox"
								})]
							})
						]
					})
				] })
			]
		})
	}) });
});
//#endregion
export { ProfilePage_default as default };
