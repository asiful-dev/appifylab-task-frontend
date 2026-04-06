import { API_ROUTES } from "@/shared/libs/constants";
import { apiClient } from "@/shared/libs/api-client";
import type {
  ForgotPasswordInput,
  LoginInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/shared/validators/auth.schema";

export const authApi = {
  login: <T>(input: LoginInput) =>
    apiClient.post<T>(API_ROUTES.auth.login, input),
  register: <T>(input: RegisterInput) =>
    apiClient.post<T>(API_ROUTES.auth.register, input),
  refresh: <T>() => apiClient.post<T>(API_ROUTES.auth.refresh),
  logout: <T>() => apiClient.post<T>(API_ROUTES.auth.logout),
  forgotPassword: <T>(input: ForgotPasswordInput) =>
    apiClient.post<T>(API_ROUTES.auth.forgotPassword, input),
  resetPassword: <T>(input: ResetPasswordInput) =>
    apiClient.post<T>(API_ROUTES.auth.resetPassword, input),
};
