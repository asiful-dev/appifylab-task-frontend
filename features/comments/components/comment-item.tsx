"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { useCreateReply } from "@/features/comments/hooks/use-create-reply";
import { useReplies } from "@/features/comments/hooks/use-replies";
import type { Comment } from "@/features/comments/utils/comment.types";
import { LikeButton } from "@/features/likes/components/like-button";
import { WhoLikedModal } from "@/features/likes/components/who-liked-modal";
import { useToggleLike } from "@/features/likes/hooks/use-toggle-like";
import { RelativeTime } from "@/shared/ui-components/composed/relative-time";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui-components/controls/dialog";

import { CommentInput } from "./comment-input";
import { ReplyList } from "./reply-list";

export function CommentItem({
  comment,
  currentUserId,
  postId,
  onDelete,
}: {
  comment: Comment;
  currentUserId?: string;
  postId: string;
  onDelete: (commentId: string) => Promise<void>;
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [likesTargetId, setLikesTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const toggleLikeMutation = useToggleLike("comment");
  const createReplyMutation = useCreateReply(comment.id, postId);
  const repliesQuery = useReplies(comment.id, showReplies);

  const isOwner = currentUserId === comment.authorId;
  const authorProfileHref =
    currentUserId && comment.authorId === currentUserId
      ? "/profile"
      : `/profile/${comment.authorId}`;

  const replies = useMemo(
    () => repliesQuery.data?.pages.flatMap((page) => page.replies ?? []) ?? [],
    [repliesQuery.data],
  );

  return (
    <article className="flex items-start gap-3">
      <Link href={authorProfileHref}>
        <UserAvatar
          size="sm"
          src={comment.author.profileImageUrl}
          firstName={comment.author.firstName}
          lastName={comment.author.lastName}
        />
      </Link>
      <div className="w-full">
        <div className="rounded-md bg-muted px-3 py-2">
          <Link
            href={authorProfileHref}
            className="text-xs font-medium text-foreground hover:underline"
          >
            {comment.author.firstName} {comment.author.lastName}
          </Link>
          <p className="text-sm text-foreground">{comment.content}</p>
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-1">
          <LikeButton
            isLiked={comment.isLiked}
            count={comment.likeCount}
            isLoading={toggleLikeMutation.isPending || isDeleting}
            onToggle={() => toggleLikeMutation.mutate({ targetId: comment.id })}
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isDeleting}
            onClick={() => setShowReplyInput((previous) => !previous)}
          >
            Reply
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={isDeleting}
            onClick={() => setLikesTargetId(comment.id)}
          >
            Who liked
          </Button>

          <span className="text-xs text-muted-foreground">
            <RelativeTime value={comment.createdAt} />
          </span>

          {isOwner ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isDeleting}
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          ) : null}
        </div>

        {showReplyInput ? (
          <div className="mt-2 ml-12">
            <CommentInput
              placeholder="Write a reply..."
              isLoading={createReplyMutation.isPending}
              onSubmit={async (content) => {
                await createReplyMutation.mutateAsync(content);
                setShowReplies(true);
                setShowReplyInput(false);
              }}
            />
          </div>
        ) : null}

        <div className="mt-2 ml-12">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowReplies((previous) => !previous)}
          >
            {showReplies ? "Hide replies" : "View replies"}
          </Button>
        </div>

        {showReplies ? (
          <ReplyList
            replies={replies}
            hasMore={repliesQuery.hasNextPage}
            isLoadingMore={repliesQuery.isFetchingNextPage}
            currentUserId={currentUserId}
            onLoadMore={() => void repliesQuery.fetchNextPage()}
            onDelete={onDelete}
            onShowLikes={(replyId) => setLikesTargetId(replyId)}
          />
        ) : null}

        <WhoLikedModal
          open={Boolean(likesTargetId)}
          onClose={() => setLikesTargetId(null)}
          targetType="comment"
          targetId={likesTargetId ?? ""}
        />

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete comment?</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                disabled={isDeleting}
                onClick={async () => {
                  setIsDeleting(true);

                  try {
                    await onDelete(comment.id);
                    setIsDeleteDialogOpen(false);
                    toast.success("Comment deleted");
                  } catch {
                    toast.error("Unable to delete comment");
                  } finally {
                    setIsDeleting(false);
                  }
                }}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}
