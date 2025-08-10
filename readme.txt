
----------------------------------------------------------------------
-- implementing openid Connect into .net Core Server with SPA client
----------------------------------------------------------------------

HOW TO ADD OPENID CONNECT TO an existing Vue3 SPA USING oidc-client-ts PACKAGE


How it Works 
1.	Login Initiation
When you call userManager.signinRedirect(), the user is redirected to the identity provider’s login page.
2.	Authentication
The user logs in at the identity provider.
3.	Redirection
After successful authentication, the identity provider redirects the user back to the URL specified in redirect_uri (in your config: https://localhost:8070/oidc-callback), along with an authorization code or tokens as URL parameters.
4.	Callback Handling
Your application (typically a route/component like OidcCallback.vue) processes the response at /oidc-callback, exchanges the code for tokens, and completes the login process.
Example Flow
•	User clicks "Login"
•	App calls userManager.signinRedirect()
•	User is sent to Keycloak, logs in
•	Keycloak redirects user to https://localhost:8070/oidc-callback?code=...
•	Your app handles the code at /oidc-callback and logs the user in


Prerequisites:
1. Install odic-client-ts package. see https://www.npmjs.com/package/oidc-client-ts. This package is used for handling OpenID Connect and OAuth 2.0 authentication in the Vue.js application.  
From a developer command prompt, CD to your client directory and run the following command:
npm install oidc-client-ts

2. Install Vue Router 4
npm install vue-router@4

3. Install Pinia for state management and storing user authentication state.
npm install pinia

4. Configuring the oidc-client-ts package is done by creating a configuration file that defines the authentication settings, such as the authority (identity provider), client ID, 
redirect URIs, and scopes required for authentication. This configuration will be used by the oidc-client-ts library to manage user authentication flows, token management, and  
session management within the Vue.js application.

Create the folder in src/services. In that folder create a file `oidcConfig.js` file with the following content:

5. Create a Pinia store to manage user authentication state. This store will handle user login, logout, and session management using the oidc-client-ts library.


6. Set up Vue Router to handle authentication routes. You will need to create routes for login, callback, and logout.
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import Home from '../views/Home.vue';
import Callback from '../views/Callback.vue';
import SilentRenew from '../views/SilentRenew.vue';

7. Create the Vue Router instance and define your routes, including the authentication routes.
for example, To route to views\Callback.vue, you can add the following route:


Server Setup
Prequisites: Microsoft.AspNetCore.Authentication.JwtBearer
Microsoft.AspNetCore.Authentication.JwtBearer is a middleware component designed for ASP.NET Core applications. It facilitates JSON Web Token (JWT) authentication, enabling secure authentication for APIs and web services. This package allows you to validate JWT tokens issued by an authentication server, ensuring secure access to your application's resources.



