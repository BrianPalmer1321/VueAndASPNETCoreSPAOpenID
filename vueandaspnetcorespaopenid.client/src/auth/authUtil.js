// Common function to fetch data from url with authentication
import { useAuthStore } from '../stores/authStore.js';
import { userManager } from '../auth/oidcConfig.js';

export async function fetchWithAuth(url) {
  const authStore = useAuthStore();
  let accessToken = null;
  if (authStore.isAuthenticated && authStore.user && userManager) {
    // If using oidc-client-ts, get the raw user object for the token
    const user = await userManager.getUser();
    accessToken = user?.access_token;
  }

  // Fallback: try to get token from authStore.user if available
  if (!accessToken && authStore.user && authStore.user.accessToken) {
    accessToken = authStore.user.access_token;
  }

  // Prepare fetch options with Authorization header if token is available
  const fetchOptions = accessToken
    ? { headers: { 'Authorization': `Bearer ${accessToken}` } }
    : {};

  return await fetch(url, fetchOptions);

}

