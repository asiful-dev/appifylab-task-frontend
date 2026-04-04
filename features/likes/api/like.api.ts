import { apiClient } from "@/shared/libs/api-client";

import type {
  LikeToggleResponse,
  WhoLikedParams,
  WhoLikedResponse,
} from "@/features/likes/utils/like.types";

export const likeApi = {
  togglePostLike: (postId: string) =>
    apiClient.post<LikeToggleResponse>(`/posts/${postId}/like`),

  toggleCommentLike: (commentId: string) =>
    apiClient.post<LikeToggleResponse>(`/comments/${commentId}/like`),

  getPostLikes: (postId: string, params?: WhoLikedParams) =>
    apiClient.get<WhoLikedResponse>(`/posts/${postId}/likes`, {
      query: {
        cursor: params?.cursor,
        limit: params?.limit ?? 20,
      },
    }),

  getCommentLikes: (commentId: string, params?: WhoLikedParams) =>
    apiClient.get<WhoLikedResponse>(`/comments/${commentId}/likes`, {
      query: {
        cursor: params?.cursor,
        limit: params?.limit ?? 20,
      },
    }),
};
