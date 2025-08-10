<script setup>
  import { onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore'

  const router = useRouter();
  const authStore = useAuthStore()

  onMounted(async () => {
    try {
      console.log('OidcCallback: onMounted');
      // 4.	Callback Handling. This processes the response and stores the user in the userManager
      await authStore.handleCallback()
      // Optionally redirect after successful callback

      //if (authStore.isAuthenticated) {
      //  router.replace({ path: '/' })
      //} else {
      //  router.replace({ path: '/login' })
      //}
    } catch (error) {
      // Handle errors (e.g., show a message or redirect to an error page)
      console.error('OIDC callback error:', error);
      router.replace({ path: '/login' });
    }
  });
</script>

<template>
  <div>
    <!--<p>Signing you in...</p>-->
  </div>
</template>
