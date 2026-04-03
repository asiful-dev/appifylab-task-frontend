"use client";

import Image from "next/image";
import { toast } from "sonner";

import type { Post } from "@/features/feed/utils/post.types";
import { useDeletePost } from "@/features/feed/hooks/use-delete-post";
import { useUpdatePost } from "@/features/feed/hooks/use-update-post";
import { RelativeTime } from "@/shared/ui-components/composed/relative-time";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
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

  const canManage = currentUserId === post.authorId;

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          <UserAvatar
            src={post.author.profileImageUrl}
            firstName={post.author.firstName}
            lastName={post.author.lastName}
          />
          <div>
            <p className="text-sm font-medium text-foreground">
              {post.author.firstName} {post.author.lastName}
            </p>
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

        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt="Post media"
            width={720}
            height={420}
            className="h-auto w-full rounded-md object-cover"
          />
        ) : null}

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <p>{post.likeCount} reactions</p>
          <p>{post.commentCount} comments</p>
        </div>
      </CardContent>
    </Card>
  );
}
