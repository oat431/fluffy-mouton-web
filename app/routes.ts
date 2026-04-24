import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  index("pages/IndexRedirectPage.tsx"),
  route("login", "pages/LoginPage.tsx"),
  layout("components/ProtectedRouteLayout.tsx", [
    route("profile", "pages/ProfilePage.tsx"),
    route("short-link", "pages/ShortLinkPage.tsx"),
  ]),
  route("*", "pages/CatchAllRedirectPage.tsx"),
] satisfies RouteConfig;
