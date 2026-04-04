"use client";

import type { Comment } from "@/features/comments/utils/comment.types";
import { Button } from "@/shared/ui-components/controls/button";

import { CommentItem } from "./comment-item";

export function CommentList({
  comments,
  postId,
  currentUserId,
  hasMore,
  isLoadingMore,
  onLoadMore,
  onDelete,
}: {
  comments: Comment[];
  postId: string;
  currentUserId?: string;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore: () => void;
  onDelete: (commentId: string) => Promise<void>;
}) {
  return (
    <div className="space-y-3">
      {hasMore ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore
            ? "Loading comments..."
            : `View previous comments (${comments.length} shown)`}
        </Button>
      ) : null}

      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          postId={postId}
          currentUserId={currentUserId}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
