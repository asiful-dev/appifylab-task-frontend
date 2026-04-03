import { API_ROUTES } from "@/shared/libs/constants";
import { apiClient } from "@/shared/libs/api-client";
import type {
  CreateCommentInput,
  ReplyCommentInput,
} from "@/shared/validators/comment.schema";

type CommentListQuery = {
  page?: number;
  limit?: number;
  cursor?: string;
};

export const commentsApi = {
  listByPost: <T>(postId: string, query?: CommentListQuery) =>
    apiClient.get<T>(`/posts/${postId}/comments`, { query }),
  create: <T>(postId: string, input: CreateCommentInput) =>
    apiClient.post<T>(`/posts/${postId}/comments`, input),
  replies: <T>(commentId: string, query?: CommentListQuery) =>
    apiClient.get<T>(`${API_ROUTES.comments.base}/${commentId}/replies`, {
      query,
    }),
  reply: <T>(commentId: string, input: ReplyCommentInput) =>
    apiClient.post<T>(
      `${API_ROUTES.comments.base}/${commentId}/replies`,
      input,
    ),
  remove: <T>(commentId: string) =>
    apiClient.delete<T>(`${API_ROUTES.comments.base}/${commentId}`),
  like: <T>(commentId: string) =>
    apiClient.post<T>(`${API_ROUTES.comments.base}/${commentId}/like`),
  unlike: <T>(commentId: string) =>
    apiClient.delete<T>(`${API_ROUTES.comments.base}/${commentId}/like`),
};
