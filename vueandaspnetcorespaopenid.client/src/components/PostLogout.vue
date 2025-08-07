<template>
  <div><h1>Post Logout</h1></div>
  <div>You have logged out.</div>
</template>

<script setup>
import { onMounted } from "vue";


  onMounted(() => {
    console.log("PostLogout mounted");
  });
  
</script>
