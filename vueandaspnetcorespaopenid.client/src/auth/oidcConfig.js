import { UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { useAuthStore } from '../stores/authstore';

//export const oidcConfig = {
//  authority: "https://your-openid-provider.com",
//  client_id: "your-client-id",
//  redirect_uri: window.location.origin + "/callback",
//  response_type: "code",
//  scope: "openid profile email",
//  post_logout_redirect_uri: window.location.origin + "/"
//};

export const oidcConfig = {
    authority: "https://demo.duendesoftware.com",
    client_id: "interactive.public",
    //authority: 'https://qa-sso.cambiumastqa.com/auth/realms/Maui/',
    //client_id: 'SP_AST_HANDSCORING_LOCALHOST_MAUI_OIDC_QA', //'SP_LOCALHOST_HANDSCORINGCENTRAL_OIDC_UAT',  //SP_AST_LOCALHOST_OIDC_MAUI_QA', //SP_AST_MAUI_HANDSCORINGCENTRAL_OIDC_UAT',SP_ANALYSISLOCALHOST_ANALYSIS_QA
    redirect_uri: 'https://localhost:8070/oidccallback', // Replace with your application's redirect URI
    post_logout_redirect_uri: 'https://localhost:8070/postlogout', // Replace with your application's post-logout redirect URI
    response_type: 'code', // Use 'code' for authorization code flow
    scope: 'openid profile email', // Define the scopes required for your application
    automaticSilentRenew: true, // Enable silent token renewal
    silent_redirect_uri: 'https://localhost:8070/silentrenew', // URI for silent renew
    userStore: new WebStorageStateStore({ store: window.localStorage }), // Use local storage for user state
};
export const userManager = new UserManager(oidcConfig);
