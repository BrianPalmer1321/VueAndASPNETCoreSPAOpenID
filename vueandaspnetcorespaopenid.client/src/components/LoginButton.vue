<template>
  <button @click="login">Login</button>
  <button @click="logout">Logout</button>
</template>

<script>
import { login, logout } from "../auth/oidcService";

export default {
  methods: {
    login,
    logout
  }
};
</script>