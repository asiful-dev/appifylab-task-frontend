"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CommentSection } from "@/features/comments/components/comment-section";
import type { Post } from "@/features/feed/utils/post.types";
import { useDeletePost } from "@/features/feed/hooks/use-delete-post";
import { useUpdatePost } from "@/features/feed/hooks/use-update-post";
import { LikeButton } from "@/features/likes/components/like-button";
import { ReactionSummary } from "@/features/likes/components/reaction-summary";
import { WhoLikedModal } from "@/features/likes/components/who-liked-modal";
import { useToggleLike } from "@/features/likes/hooks/use-toggle-like";
import { RelativeTime } from "@/shared/ui-components/composed/relative-time";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/ui-components/controls/card";
import { PostOptionsMenu } from "@/features/feed/components/post-options-menu";

export function PostCard({
  post,
  currentUserId,
}: {
  post: Post;
  currentUserId?: string;
}) {
  const updateMutation = useUpdatePost();
  const deleteMutation = useDeletePost();
  const toggleLikeMutation = useToggleLike("post");
  const [showWhoLiked, setShowWhoLiked] = useState(false);
  const [mediaSrc, setMediaSrc] = useState(post.imageUrl ?? null);
  const authorProfileHref =
    currentUserId && post.authorId === currentUserId
      ? "/profile"
      : `/profile/${post.authorId}`;

  const canManage = currentUserId === post.authorId;

  useEffect(() => {
    setMediaSrc(post.imageUrl ?? null);
  }, [post.imageUrl]);

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <Link href={authorProfileHref}>
            <UserAvatar
              src={post.author.profileImageUrl}
              firstName={post.author.firstName}
              lastName={post.author.lastName}
            />
          </Link>
          <div>
            <Link
              href={authorProfileHref}
              className="text-sm font-medium text-foreground hover:underline"
            >
              {post.author.firstName} {post.author.lastName}
            </Link>
            <p className="text-xs text-muted-foreground">
              <RelativeTime value={post.createdAt} /> · {post.visibility}
            </p>
          </div>
        </div>

        <PostOptionsMenu
          canManage={canManage}
          onEdit={() => {
            if (!canManage) {
              toast.error("You can only edit your own posts");
              return;
            }

            const content = window.prompt(
              "Edit post content",
              post.content ?? "",
            );

            if (content === null) {
              return;
            }

            updateMutation.mutate({
              id: post.id,
              payload: {
                content,
                visibility: post.visibility,
              },
            });
          }}
          onDelete={() => {
            if (!canManage) {
              toast.error("You can only delete your own posts");
              return;
            }

            deleteMutation.mutate(post.id);
          }}
        />
      </CardHeader>

      <CardContent className="space-y-3">
        {post.content ? (
          <p className="text-sm text-foreground">{post.content}</p>
        ) : null}

        {mediaSrc ? (
          <Image
            src={mediaSrc}
            alt="Post media"
            width={720}
            height={420}
            className="h-auto w-full rounded-md object-cover"
            onError={() => {
              if (mediaSrc !== "/images/post_img.png") {
                setMediaSrc("/images/post_img.png");
              }
            }}
          />
        ) : null}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <ReactionSummary
            totalCount={post.likeCount}
            onClick={() => setShowWhoLiked(true)}
          />
          <p>{post.commentCount} comments</p>
        </div>
      </CardContent>

      <div className="flex items-center gap-2 px-4 py-2">
        <LikeButton
          isLiked={post.isLiked}
          count={post.likeCount}
          isLoading={toggleLikeMutation.isPending}
          onToggle={() => toggleLikeMutation.mutate({ targetId: post.id })}
        />

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            const element = document.getElementById(`comments-${post.id}`);
            element?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          Comment
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled
          title="Share is coming soon"
        >
          Share
        </Button>
      </div>

      <div id={`comments-${post.id}`}>
        <CommentSection postId={post.id} />
      </div>

      <WhoLikedModal
        open={showWhoLiked}
        onClose={() => setShowWhoLiked(false)}
        targetType="post"
        targetId={post.id}
      />
    </Card>
  );
}
