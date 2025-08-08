<template>
  <div>
    <h1>User Details</h1>
    <div v-if="!authStore.isAuthenticated">
      <p>You are not authenticated.</p>
      <a href="/login">Login</a>
    </div>
    <div v-else>
      <p>Welcome, {{ authStore.user?.name }}!</p>
      <p>Email: {{ authStore.user?.email }}</p>
     <!-- <p>Roles: {{ authStore.user?.roles.join(', ') }}</p>-->
      <a href="/logout">Logout</a>
    </div>
  </div>
</template>

<!--<script lang="ts">
  import { defineComponent } from 'vue';
  import useAuthStore from '../stores/authstore.js';

  export default defineComponent({
    setup() {
      const authStore = useAuthStore();
      return { authStore };
    }
  });
</script>-->

<script setup>
  import { useAuthStore } from '../stores/authstore.js'; // Adjust path as needed

  const authStore = useAuthStore();
</script>

<style>
  /* Add your styles here if needed */
</style>
