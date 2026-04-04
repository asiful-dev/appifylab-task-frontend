export type PostVisibility = "public" | "private";

export interface PostAuthor {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
}

export interface Post {
  id: string;
  authorId: string;
  content: string | null;
  imageUrl: string | null;
  visibility: PostVisibility;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  author: PostAuthor;
  isLiked: boolean;
}

export interface FeedMeta {
  nextCursor: string | null;
  hasMore: boolean;
}

export interface FeedPageResponse {
  posts: Post[];
  meta?: FeedMeta;
  nextCursor?: string | null;
  hasMore?: boolean;
}

export interface GetPostsParams {
  cursor?: string;
  limit?: number;
}

export interface UpdatePostInput {
  content?: string;
  visibility?: PostVisibility;
}
