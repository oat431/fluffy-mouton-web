import { n as api } from "./Section-sBf6xsXA.js";
//#region app/services/AuthService.ts
async function login(loginRequest) {
	return (await api.post("/auth/login", loginRequest)).data;
}
async function register(registerRequest) {
	return (await api.post("/auth/register", registerRequest)).data;
}
async function getUserDetail() {
	return (await api.get("/auth/detail")).data;
}
async function revokeAccess(revokeRequest) {
	return (await api.post("/auth/revoke", revokeRequest)).data;
}
async function verifyEmail(token) {
	return (await api.get("/auth/verify-email", { params: { token } })).data;
}
//#endregion
export { verifyEmail as a, revokeAccess as i, login as n, register as r, getUserDetail as t };
