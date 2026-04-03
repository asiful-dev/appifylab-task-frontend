import { API_ROUTES } from "@/shared/libs/constants";
import { apiClient } from "@/shared/libs/api-client";

import type {
  FeedPageResponse,
  GetPostsParams,
  Post,
  UpdatePostInput,
} from "@/features/feed/utils/post.types";

export const postApi = {
  getPosts: (params?: GetPostsParams) =>
    apiClient.get<FeedPageResponse>(API_ROUTES.posts.base, {
      query: {
        cursor: params?.cursor,
        limit: params?.limit ?? 10,
      },
    }),
  createPost: (payload: FormData) =>
    apiClient.upload<Post>(API_ROUTES.posts.base, payload),
  getPost: (id: string) =>
    apiClient.get<Post>(`${API_ROUTES.posts.base}/${id}`),
  updatePost: (id: string, payload: UpdatePostInput) =>
    apiClient.patch<Post>(`${API_ROUTES.posts.base}/${id}`, payload),
  deletePost: (id: string) =>
    apiClient.delete<{ message: string }>(`${API_ROUTES.posts.base}/${id}`),
};
