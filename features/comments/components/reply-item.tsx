"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import type { Comment } from "@/features/comments/utils/comment.types";
import { LikeButton } from "@/features/likes/components/like-button";
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

export function ReplyItem({
  reply,
  currentUserId,
  onDelete,
  onShowLikes,
}: {
  reply: Comment;
  currentUserId?: string;
  onDelete: (replyId: string) => Promise<void>;
  onShowLikes: (replyId: string) => void;
}) {
  const isOwner = currentUserId === reply.authorId;
  const toggleLikeMutation = useToggleLike("comment");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const authorProfileHref =
    currentUserId && reply.authorId === currentUserId
      ? "/profile"
      : `/profile/${reply.authorId}`;

  return (
    <article className="flex items-start gap-2">
      <Link href={authorProfileHref}>
        <UserAvatar
          size="sm"
          src={reply.author.profileImageUrl}
          firstName={reply.author.firstName}
          lastName={reply.author.lastName}
        />
      </Link>

      <div className="w-full">
        <div className="rounded-md bg-muted px-3 py-2">
          <Link
            href={authorProfileHref}
            className="text-xs font-medium text-foreground hover:underline"
          >
            {reply.author.firstName} {reply.author.lastName}
          </Link>
          <p className="text-sm text-foreground">{reply.content}</p>
        </div>

        <div className="mt-1 flex items-center gap-1">
          <LikeButton
            isLiked={reply.isLiked}
            count={reply.likeCount}
            isLoading={toggleLikeMutation.isPending || isDeleting}
            onToggle={() => toggleLikeMutation.mutate({ targetId: reply.id })}
          />

          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onShowLikes(reply.id)}
            disabled={isDeleting}
          >
            Who liked
          </Button>

          <span className="text-xs text-muted-foreground">
            <RelativeTime value={reply.createdAt} />
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

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete reply?</DialogTitle>
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
                    await onDelete(reply.id);
                    setIsDeleteDialogOpen(false);
                    toast.success("Reply deleted");
                  } catch {
                    toast.error("Unable to delete reply");
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
