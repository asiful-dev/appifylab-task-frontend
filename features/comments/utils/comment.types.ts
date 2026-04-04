export interface CommentAuthor {
  id: string;
  firstName: string;
  lastName: string;
  profileImageUrl: string | null;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  parentId: string | null;
  content: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
  isLiked: boolean;
}

export interface CommentPageResponse {
  comments: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface ReplyPageResponse {
  replies: Comment[];
  nextCursor: string | null;
  hasMore: boolean;
}

export interface PaginationParams {
  cursor?: string;
  limit?: number;
}
