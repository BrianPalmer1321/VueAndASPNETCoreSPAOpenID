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
      <p>Roles: {{ authStore.user?.roles.join(', ') }}</p>
      <a href="/logout">Logout</a>
    </div>
  </div>

</template>

<script lang="ts">
  // this component displays details about the authenticated user
  import useAuthStore from '../stores/authstore.js';


    import { defineComponent } from 'vue';

    export default defineComponent({
        components: {
        },
        directives: {
        },
        filters: {
        },
        props: {
        },
        data() {
            return {
            }
        },
        computed: {
        },
        watch: {
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
      mounted() {
        const authStore = useAuthStore();

        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        methods: {
        },
    });
</script>

<style>
</style>
