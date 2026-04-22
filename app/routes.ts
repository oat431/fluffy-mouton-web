import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("pages/HomePage.tsx"),
  route("login", "pages/LoginPage.tsx"),
  route("register", "pages/RegisterPage.tsx"),
  route("verify-email", "pages/VerifyEmailPage.tsx"),
  layout("components/ProtectedRouteLayout.tsx", [
    route("profile", "pages/ProfilePage.tsx"),
    route("short-link", "pages/ShortLinkPage.tsx"),
  ])
] satisfies RouteConfig;
