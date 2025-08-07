import { defineStore } from 'pinia';
import { ref, watch } from 'vue'
import { userManager } from '../auth/oidcConfig.js';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    async initialize() {
      try {
        const user = await userManager.getUser();
        this.user = user;
        this.isAuthenticated = !!user && !user.expired;
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
        const user = await userManager.signinRedirectCallback();
        console.log('Callback handling returned:');

        this.user = user;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Callback handling failed:', error);
      }
    },
    async logout() {
      try {
        await userManager.signoutRedirect();
        this.user = null;
        this.isAuthenticated = false;
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
      } catch (error) {
        console.error('Silent renew failed:', error);
      }
    }

  },
});
