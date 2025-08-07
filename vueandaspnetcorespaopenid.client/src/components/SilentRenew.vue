<template>
  <div>Silent renew in progress...</div>
</template>

<script setup>
  import { onMounted } from 'vue';
  import { userManager } from '@/auth/oidcService';

  onMounted(() => {
    userManager.signinSilentCallback()
      .catch(e => {
        // Optionally log or handle errors
        console.error('Silent renew callback error:', e);
      });
  });
</script>
