"use client";

import type { Comment } from "@/features/comments/utils/comment.types";
import { Button } from "@/shared/ui-components/controls/button";

import { ReplyItem } from "./reply-item";

export function ReplyList({
  replies,
  hasMore,
  isLoadingMore,
  currentUserId,
  onLoadMore,
  onDelete,
  onShowLikes,
}: {
  replies: Comment[];
  hasMore?: boolean;
  isLoadingMore?: boolean;
  currentUserId?: string;
  onLoadMore: () => void;
  onDelete: (replyId: string) => Promise<void>;
  onShowLikes: (replyId: string) => void;
}) {
  return (
    <div className="mt-2 ml-12 space-y-2">
      {replies.map((reply) => (
        <ReplyItem
          key={reply.id}
          reply={reply}
          currentUserId={currentUserId}
          onDelete={onDelete}
          onShowLikes={onShowLikes}
        />
      ))}

      {hasMore ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onLoadMore}
          disabled={isLoadingMore}
        >
          {isLoadingMore
            ? "Loading replies..."
            : `View more replies (${replies.length} shown)`}
        </Button>
      ) : null}
    </div>
  );
}
