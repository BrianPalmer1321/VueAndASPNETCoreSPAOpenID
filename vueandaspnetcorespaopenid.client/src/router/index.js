import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authstore';
import '@/auth/oidcService'; // Import the userManager instance from oidcService
import TheWelcome from '@/components/TheWelcome.vue';
import HelloWorld from '@/components/HelloWorld.vue'
import OidcCallback from '@/components/OidcCallback.vue';

const routes = [
  {
    path: '/',
    component: TheWelcome,
  },
  {
    path: '/home',
    name: 'Home',
    component: TheWelcome
  },
  {
    path: '/thewelcome',
    name: 'TheWelcome',
    component: TheWelcome,
  },
  {
    path: '/helloWorld',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/membersonly',
    name: 'MembersOnly',
    component: () => import('@/components/MembersOnly.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/oidccallback',
    name: 'OidcCallback',
    component: OidcCallback,
    //beforeEnter: (to, from, next) => {
    //  console.log('In OidcCallback beforeEnter');
    //  next(); // Proceed to the OidcCallback component
    //},
    meta: { requiresAuth: false } // This route does not require auth
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      if (authStore.isAuthenticated) {
        next({ path: '/home' }); // Redirect to home if already authenticated
      } else {
        // Store the intended route path
        //localStorage.setItem('intendedRoute', to.fullPath);
        console.info('intendedRoute:', to.fullPath);
        authStore.login().then(() => {
          next(); // Proceed to login route
        }).catch(error => {
          console.error('Login failed:', error);
          next(false); // Cancel navigation on error
        });
      }
    }
  },
  {
    path: '/silentrenew',
    name: 'SilentRenew',
    component: () => import('@/components/SilentRenew.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    beforeEnter: (to, from, next) => {
      const authStore = useAuthStore();
      authStore.logout().then(() => {
        next({ path: '/' }); // Redirect to home after logout
      }).catch(error => {
        console.error('Logout failed:', error);
        next(false); // Cancel navigation on error
      });
    }
  },
  {
    path: '/postlogout',
    name: 'PostLogout',
    component: () => import('@/components/PostLogout.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/components/NotFound.vue'),
    beforeEnter: (to, from, next) => {
      console.log('In NotFound beforeEnter');
      next();
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//router.beforeEach((to, from, next) => {
//  const authStore = useAuthStore();
//  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//    authStore.login(); // the route requires authentication, so trigger the login process
//  } else {
//    next() // Proceed to the requested route
//  }
//})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    //next(authStore.login()); // Redirect to login
    next({ path: '/login', query: { redirect: to.fullPath } }); // Redirect to login
  } else {
    next();
  }
});


export default router

