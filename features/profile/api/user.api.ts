import { apiClient } from "@/shared/libs/api-client";
import { API_ROUTES } from "@/shared/libs/constants";
import type { Post, FeedPageResponse } from "@/features/feed/utils/post.types";
import type { UpdateProfileInput } from "@/shared/validators/user.schema";

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string | null;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface UserEnvelope {
  user: User;
}

interface ProfileImageEnvelope {
  profileImageUrl: string;
}

export interface UserPostsResponse extends FeedPageResponse {
  posts: Post[];
}

function unwrapUser(payload: User | UserEnvelope): User {
  return "user" in payload ? payload.user : payload;
}

function normalizeUserPosts(payload: UserPostsResponse): UserPostsResponse {
  return {
    posts: payload.posts ?? [],
    meta: payload.meta,
    nextCursor: payload.nextCursor,
    hasMore: payload.hasMore,
  };
}

export const userApi = {
  async getMe() {
    const response = await apiClient.get<User | UserEnvelope>(
      API_ROUTES.users.me,
    );
    return unwrapUser(response);
  },
  async updateMe(input: UpdateProfileInput) {
    const response = await apiClient.patch<User | UserEnvelope>(
      API_ROUTES.users.me,
      input,
    );
    return unwrapUser(response);
  },
  uploadAvatar: (formData: FormData) =>
    apiClient.upload<ProfileImageEnvelope>(API_ROUTES.users.avatar, formData, {
      method: "PATCH",
    }),
  changePassword: (input: ChangePasswordPayload) =>
    apiClient.patch<{ message: string }>(
      `${API_ROUTES.users.me}/password`,
      input,
    ),
  async getUser(id: string) {
    const response = await apiClient.get<User | UserEnvelope>(
      `${API_ROUTES.users.base}/${id}`,
    );
    return unwrapUser(response);
  },
  async getUserPosts(
    userId: string,
    params?: { cursor?: string; limit?: number },
  ) {
    const response = await apiClient.get<UserPostsResponse>(
      `${API_ROUTES.users.base}/${userId}/posts`,
      {
        query: {
          cursor: params?.cursor,
          limit: params?.limit ?? 10,
        },
      },
    );

    return normalizeUserPosts(response);
  },
};
