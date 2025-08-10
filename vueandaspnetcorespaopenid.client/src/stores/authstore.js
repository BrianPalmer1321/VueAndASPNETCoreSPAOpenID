import { defineStore } from 'pinia';
import { ref, watch } from 'vue'
import { userManager } from '../auth/oidcConfig.js';
import { handleCallback, getUser } from '../auth/oidcService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    accessToken: null,
  }),
  actions: {
    async initialize() {
      try {
        console.log('In initialize');
        const user = await userManager.getUser();
        this.user = user
          ? {
            name: user.profile?.name || user.profile?.preferred_username || 'no avail.',
            email: user.profile?.email || 'not avail.',
            roles: user.profile?.role || [],
            aud: user.profile?.aud,
            iss: user.profile?.iss,
            idp: user.profile?.idp,
            accessToken: user.access_token
          }
          : null;
        this.isAuthenticated = !!user && !user.expired;
        this.accessToken = user?.access_token || null;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
      }
    },
    async login() {
      console.log('In login');
      try {
        await userManager.signinRedirect();
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    async handleCallback() {
      console.log('In handleCallback');
      try {
        await handleCallback();
        const user = await getUser();
        console.log('OIDC user profile:', user.profile);
        this.user = user
          ? {
            name: user.profile?.name || user.profile?.preferred_username || user.profile?.given_name ||'not avail.', 
            email: user.profile?.email || 'not avail.',
            roles: user.profile?.role || [],
            aud: user.profile?.aud,
            iss: user.profile?.iss,
            idp: user.profile?.idp,
            accessToken: user.access_token
          }
          : null;
        this.isAuthenticated = !!user && !user.expired;
        this.accessToken = user?.access_token || null;
      } catch (error) {
        console.error('Callback handling failed:', error);
        this.user = null;
        this.isAuthenticated = false;
      }
    },
    async logout() {
      try {
        await userManager.signoutRedirect();
        this.state.user = null;
        this.state.isAuthenticated = false;
        console.log('Logout succeeded:');

      } catch (error) {
        console.error('Logout failed:', error);
      }
    },
    async silentRenew() {
      try {
        await userManager.signinSilent();
      } catch (error) {
        console.error('Silent renew failed:', error);
      }
    },
    setUser(user) {
      try {
        console.log('authstore: setUser:');

        this.user = user;
        this.isAuthenticated = !!user;
        this.accessToken = user?.access_token || null;
      } catch (error) {
        console.error('Silent renew failed:', error);
      }
    }

  },
});
