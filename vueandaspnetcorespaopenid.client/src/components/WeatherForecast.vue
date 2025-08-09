<template>
    <div class="weather-component">
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>

        <div v-if="loading" class="loading">
            Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationvue">https://aka.ms/jspsintegrationvue</a> for more details.
        </div>

        <div v-if="post" class="content">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="forecast in post" :key="forecast.date">
                        <td>{{ forecast.date }}</td>
                        <td>{{ forecast.temperatureC }}</td>
                        <td>{{ forecast.temperatureF }}</td>
                        <td>{{ forecast.summary }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="js">
  import { defineComponent } from 'vue';
  import { useAuthStore } from '../stores/authstore.js';
  import { userManager } from '../auth/oidcConfig.js';

  export default defineComponent({
    data() {
      return {
        loading: false,
        post: null
      };
    },
    async created() {
      // fetch the data when the view is created and the data if the user is authenticated
      const authStore = useAuthStore();
      if (authStore.isAuthenticated && authStore.user && userManager) {
        // If using oidc-client-ts, get the raw user object for the token
        const user = await userManager.getUser();
        if (user) {
          console.log('User is authenticated:', user);
          await this.fetchData();
        }
      } else {
        console.log('User is not authenticated');
      }

    },
    watch: {
      // call the method again if the route changes
      '$route': 'fetchData'
    },
    methods: {
      async fetchData() {
        this.post = null;
        this.loading = true;

        const authStore = useAuthStore();
        // Ensure user is authenticated and has an access token
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


        var response = await fetch('weatherforecast', fetchOptions);
        if (response.ok) {
          this.post = await response.json();
          this.loading = false;
        }
      }
    },
  });
</script>

<style scoped>
th {
    font-weight: bold;
}

th, td {
    padding-left: .5rem;
    padding-right: .5rem;
}

.weather-component {
    text-align: center;
}

table {
    margin-left: auto;
    margin-right: auto;
}
</style>
