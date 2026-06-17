// AuthService.ts — OAuth2 migration
//
// Authentication is now handled by Keycloak via Flowero Gate.
// The gateway manages sessions; this service is kept as a stub
// for any future direct Keycloak API interactions.

// Example: get user info from Keycloak's userinfo endpoint if needed
// export async function getUserInfo(accessToken: string) {
//   const response = await fetch('https://auth.panomete.com/realms/flowerogate/protocol/openid-connect/userinfo', {
//     headers: { Authorization: `Bearer ${accessToken}` }
//   });
//   return response.json();
// }
