import { APP_ROUTES } from "@/shared/libs/constants";

export function getAuthRedirectPath(isAuthenticated: boolean) {
  return isAuthenticated ? APP_ROUTES.feed : null;
}

export function getProtectedRedirectPath(isAuthenticated: boolean) {
  return isAuthenticated ? null : APP_ROUTES.login;
}
