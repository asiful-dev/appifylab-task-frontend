import { API_ROUTES } from "@/shared/libs/constants";
import { apiClient } from "@/shared/libs/api-client";

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

export const authFeatureApi = {
  register: <T>(payload: RegisterPayload) =>
    apiClient.post<T>(API_ROUTES.auth.register, payload),
  login: <T>(payload: LoginPayload) =>
    apiClient.post<T>(API_ROUTES.auth.login, payload),
  refresh: <T>() =>
    apiClient.post<T>(API_ROUTES.auth.refresh, undefined, { csrf: false }),
  logout: <T>() =>
    apiClient.post<T>(API_ROUTES.auth.logout, undefined, { csrf: false }),
  forgotPassword: <T>(payload: ForgotPasswordPayload) =>
    apiClient.post<T>(API_ROUTES.auth.forgotPassword, payload),
  resetPassword: <T>(payload: ResetPasswordPayload) =>
    apiClient.post<T>(API_ROUTES.auth.resetPassword, payload),
};
