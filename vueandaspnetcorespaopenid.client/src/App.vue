<script setup>
  import WeatherForecast from './components/WeatherForecast.vue'
  import User from './components/User.vue'
  import MembersOnly from './components/MembersOnly.vue'
  import { useAuthStore } from './stores/authStore.js'
  import { oidcConfig } from './auth/oidcConfig.js'
  const authStore = useAuthStore();
  //oidcConfig.authority
  
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <User />
      <WeatherForecast msg="You did it!" v-if="authStore.isAuthenticated" />
    </div>

  </header>

  <main>
    <!--<TheWelcome />-->
    <div class="wrapper">
      <div>
        <a :href="oidcConfig.authority" target="_blank" rel="noopener">
          OpenID Provider:  {{ oidcConfig.authority }}
        </a>
      </div>
      <div>
        <a :href="oidcConfig.authority +'/.well-known/openid-configuration'" target="_blank" rel="noopener">
          Well-known/openid-configuration: {{ oidcConfig.authority }}
        </a>
      </div>
    </div>
    <MembersOnly v-if="authStore.isAuthenticated" />
    <router-view />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
