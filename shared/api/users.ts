import { API_ROUTES } from "@/shared/libs/constants";
import { apiClient } from "@/shared/libs/api-client";
import type {
  UpdateProfileInput,
  ChangePasswordInput,
} from "@/shared/validators/user.schema";

export const usersApi = {
  me: <T>() => apiClient.get<T>(API_ROUTES.users.me),
  byId: <T>(id: string) => apiClient.get<T>(`/users/${id}`),
  updateProfile: <T>(input: UpdateProfileInput) =>
    apiClient.patch<T>(API_ROUTES.users.me, input),
  changePassword: <T>(input: ChangePasswordInput) =>
    apiClient.patch<T>(`${API_ROUTES.users.me}/password`, input),
  updateAvatar: <T>(formData: FormData) =>
    apiClient.upload<T>(API_ROUTES.users.avatar, formData, { method: "PATCH" }),
};
