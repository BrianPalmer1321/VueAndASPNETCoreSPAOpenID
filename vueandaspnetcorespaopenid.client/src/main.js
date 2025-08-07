import './assets/main.css'
import { useAuthStore } from '@/stores/authstore';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

const authStore = useAuthStore();

authStore.initialize().then(() => {
  app.use(router);
  app.mount('#app');
});
