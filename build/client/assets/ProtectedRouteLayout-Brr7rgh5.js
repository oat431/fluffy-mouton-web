import { n as useAuth } from "./AuthContext-cSC1Kn-t.js";
import { Navigate, Outlet, UNSAFE_withComponentProps } from "react-router";
import { jsx } from "react/jsx-runtime";
//#region app/components/ProtectedRouteLayout.tsx
var ProtectedRouteLayout_default = UNSAFE_withComponentProps(function ProtectedRouteLayout() {
	const { isAuthenticated } = useAuth();
	if (!isAuthenticated) return /* @__PURE__ */ jsx(Navigate, {
		to: "/login",
		replace: true
	});
	return /* @__PURE__ */ jsx(Outlet, {});
});
//#endregion
export { ProtectedRouteLayout_default as default };
