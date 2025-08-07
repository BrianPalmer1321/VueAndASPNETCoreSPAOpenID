import { UserManager } from "oidc-client-ts";
import { oidcConfig } from "./oidcConfig";

const userManager = new UserManager(oidcConfig);

export function login() {
  return userManager.signinRedirect();
}

export function logout() {
  return userManager.signoutRedirect();
}

export function handleCallback() {
  return userManager.signinRedirectCallback();
}

export function getUser() {
  return userManager.getUser();
}