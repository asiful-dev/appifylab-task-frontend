import { API_ROUTES } from "@/shared/libs/constants";
import { apiClient } from "@/shared/libs/api-client";
import type {
  CreatePostInput,
  UpdatePostInput,
} from "@/shared/validators/post.schema";

type PostListQuery = {
  page?: number;
  limit?: number;
  cursor?: string;
  search?: string;
  authorId?: string;
};

export const postsApi = {
  list: <T>(query?: PostListQuery) =>
    apiClient.get<T>(API_ROUTES.posts.base, { query }),
  byId: <T>(id: string) => apiClient.get<T>(`${API_ROUTES.posts.base}/${id}`),
  create: <T>(input: CreatePostInput) =>
    apiClient.post<T>(API_ROUTES.posts.base, input),
  update: <T>(id: string, input: UpdatePostInput) =>
    apiClient.patch<T>(`${API_ROUTES.posts.base}/${id}`, input),
  remove: <T>(id: string) =>
    apiClient.delete<T>(`${API_ROUTES.posts.base}/${id}`),
  like: <T>(id: string) =>
    apiClient.post<T>(`${API_ROUTES.posts.base}/${id}/like`),
  unlike: <T>(id: string) =>
    apiClient.delete<T>(`${API_ROUTES.posts.base}/${id}/like`),
};
