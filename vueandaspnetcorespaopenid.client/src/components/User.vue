<template>
  <div>
    <h1>User Details</h1>
    <div v-if="!authStore.isAuthenticated">
      <p>You are not authenticated.</p>
      <a href="/login">Login</a>
    </div>
    <div v-else>
      <p>Name: {{ authStore.user?.name }}</p>
      <p>Email: {{ authStore.user?.email }}</p>
      <p>iss: {{ authStore.user?.iss }}</p>
      <p>aud: {{ authStore.user?.aud }}</p>
      <p>idp: {{ authStore.user?.idp }}</p>
      <!-- <p>Roles: {{ authStore.user?.roles.join(', ') }}</p>-->
      <a href="/logout">Logout</a>
    </div>
  </div>
</template>

<!--<script lang="ts">
  import { defineComponent } from 'vue';
  import useAuthStore from '../stores/authStore.js';

  export default defineComponent({
    setup() {
      const authStore = useAuthStore();
      return { authStore };
    }
  });
</script>-->

<script setup>
  import { useAuthStore } from '../stores/authStore.js'; 

  const authStore = useAuthStore();
  //const idToken = authStore.id_token;
  //console.log('ID Token:', idToken);

  //// Decode (for debugging only, not for production use)
  //const payload = JSON.parse(atob(idToken.split('.')[1]));
  //console.log('Decoded ID Token payload:', payload);
</script>

<style>
  /* Add your styles here if needed */
</style>
