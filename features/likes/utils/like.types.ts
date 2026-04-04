export interface LikeToggleResponse {
  liked: boolean;
  likeCount: number;
}

export interface LikedUser {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
}

export interface WhoLikedResponse {
  users: LikedUser[];
  nextCursor: string | null;
  hasMore?: boolean;
}

export interface WhoLikedParams {
  cursor?: string;
  limit?: number;
}
