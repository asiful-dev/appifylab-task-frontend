"use client";

import { useMemo } from "react";
import { toast } from "sonner";

import { useComments } from "@/features/comments/hooks/use-comments";
import { useCreateComment } from "@/features/comments/hooks/use-create-comment";
import { useDeleteComment } from "@/features/comments/hooks/use-delete-comment";
import { useAuthStore } from "@/shared/libs/auth-store";

import { CommentInput } from "./comment-input";
import { CommentList } from "./comment-list";

export function CommentSection({ postId }: { postId: string }) {
  const user = useAuthStore((state) => state.user);
  const commentsQuery = useComments(postId);
  const createCommentMutation = useCreateComment(postId);
  const deleteCommentMutation = useDeleteComment(postId);

  const comments = useMemo(
    () =>
      commentsQuery.data?.pages.flatMap((page) => page.comments ?? []) ?? [],
    [commentsQuery.data],
  );

  return (
    <section className="space-y-3 border-t border-b border-border px-4 py-3">
      <CommentInput
        avatarUrl={user?.profileImageUrl}
        firstName={user?.firstName}
        lastName={user?.lastName}
        isLoading={createCommentMutation.isPending}
        onSubmit={async (content) => {
          try {
            await createCommentMutation.mutateAsync(content);
          } catch {
            toast.error("Unable to add comment");
          }
        }}
      />

      <CommentList
        comments={comments}
        postId={postId}
        currentUserId={user?.id}
        hasMore={commentsQuery.hasNextPage}
        isLoadingMore={commentsQuery.isFetchingNextPage}
        onLoadMore={() => void commentsQuery.fetchNextPage()}
        onDelete={async (commentId) => {
          await deleteCommentMutation.mutateAsync(commentId);
        }}
      />

      {commentsQuery.isLoading ? (
        <p className="text-xs text-muted-foreground">Loading comments...</p>
      ) : null}

      {!commentsQuery.isLoading && !comments.length ? (
        <p className="text-xs text-muted-foreground">
          Be the first to comment.
        </p>
      ) : null}
    </section>
  );
}
