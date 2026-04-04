import { apiClient } from "@/shared/libs/api-client";

import type {
  Comment,
  CommentPageResponse,
  PaginationParams,
  ReplyPageResponse,
} from "@/features/comments/utils/comment.types";

export const commentApi = {
  getComments: (postId: string, params?: PaginationParams) =>
    apiClient.get<CommentPageResponse>(`/posts/${postId}/comments`, {
      query: {
        cursor: params?.cursor,
        limit: params?.limit ?? 10,
      },
    }),

  createComment: (postId: string, content: string) =>
    apiClient.post<{ comment: Comment }>(`/posts/${postId}/comments`, {
      content,
    }),

  deleteComment: (commentId: string) =>
    apiClient.delete<{ message: string }>(`/comments/${commentId}`),

  getReplies: (commentId: string, params?: PaginationParams) =>
    apiClient.get<ReplyPageResponse>(`/comments/${commentId}/replies`, {
      query: {
        cursor: params?.cursor,
        limit: params?.limit ?? 5,
      },
    }),

  createReply: (commentId: string, content: string) =>
    apiClient.post<{ reply: Comment }>(`/comments/${commentId}/replies`, {
      content,
    }),
};
