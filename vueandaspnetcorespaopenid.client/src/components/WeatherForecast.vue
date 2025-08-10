<template>
  <div class="weather-component">
    <h1>Weather forecast</h1>
    <p>This component demonstrates using authentication to securely fetch data from the server.</p>

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
  import { useAuthStore } from '../stores/authStore.js';
  import { oidcConfig, userManager } from '../auth/oidcConfig.js';
  import { fetchWithAuth } from '../auth/authUtil.js';

  export default defineComponent({
    data() {
      return {
        loading: false,
        post: null
      };
    },
    async created() {
      await this.fetchData();
    },
    watch: {
      // call the method again if the route changes
      '$route': 'fetchData'
    },
    methods: {
      async fetchData() {
        this.post = null;
        this.loading = true;

        var response = await fetchWithAuth('weatherforecast');
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
