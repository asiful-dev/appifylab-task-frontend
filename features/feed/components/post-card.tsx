"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CommentSection } from "@/features/comments/components/comment-section";
import { PostImageUpload } from "@/features/feed/components/post-image-upload";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui-components/controls/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui-components/controls/select";
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editContent, setEditContent] = useState(post.content ?? "");
  const [editVisibility, setEditVisibility] = useState(post.visibility);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const authorProfileHref =
    currentUserId && post.authorId === currentUserId
      ? "/profile"
      : `/profile/${post.authorId}`;

  const canManage = currentUserId === post.authorId;

  useEffect(() => {
    setMediaSrc(post.imageUrl ?? null);
  }, [post.imageUrl]);

  useEffect(() => {
    setEditContent(post.content ?? "");
    setEditVisibility(post.visibility);
    setEditImageFile(null);
    setEditImagePreview(null);
    setRemoveExistingImage(false);
  }, [post.content, post.visibility, post.imageUrl]);

  useEffect(() => {
    return () => {
      if (editImagePreview) {
        URL.revokeObjectURL(editImagePreview);
      }
    };
  }, [editImagePreview]);

  const editDialogPreview = editImagePreview
    ? editImagePreview
    : removeExistingImage
      ? null
      : (post.imageUrl ?? null);

  const submitEditPost = async () => {
    if (!canManage) {
      toast.error("You can only edit your own posts");
      return;
    }

    const formData = new FormData();
    formData.append("visibility", editVisibility);

    const trimmedContent = editContent.trim();
    if (trimmedContent) {
      formData.append("content", trimmedContent);
    }

    if (editImageFile) {
      formData.append("image", editImageFile);
    } else if (post.imageUrl && removeExistingImage) {
      formData.append("removeImage", "true");
    }

    try {
      await updateMutation.mutateAsync({
        id: post.id,
        payload: formData,
      });
      setIsEditDialogOpen(false);
      toast.success("Post updated");
    } catch {
      toast.error("Unable to update post");
    }
  };

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

            setEditContent(post.content ?? "");
            setEditVisibility(post.visibility);
            setEditImageFile(null);
            setEditImagePreview(null);
            setRemoveExistingImage(false);
            setIsEditDialogOpen(true);
          }}
          onDelete={() => {
            if (!canManage) {
              toast.error("You can only delete your own posts");
              return;
            }

            setIsDeleteDialogOpen(true);
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
            loading="eager"
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

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>
              Update your text, visibility, and post image.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <textarea
              value={editContent}
              onChange={(event) => setEditContent(event.target.value)}
              className="min-h-24 w-full resize-none rounded-md border border-input bg-background p-3 text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Write something ..."
              disabled={updateMutation.isPending}
            />

            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Visibility</p>
              <Select
                value={editVisibility}
                onValueChange={(value) =>
                  setEditVisibility(value as "public" | "private")
                }
                disabled={updateMutation.isPending}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Visibility" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              {post.imageUrl ? (
                <p className="text-sm font-medium text-foreground">Image</p>
              ) : null}
              <PostImageUpload
                preview={editDialogPreview}
                onSelect={(file) => {
                  if (editImagePreview) {
                    URL.revokeObjectURL(editImagePreview);
                  }
                  setEditImageFile(file);
                  setEditImagePreview(URL.createObjectURL(file));
                  setRemoveExistingImage(false);
                }}
                onClear={() => {
                  if (editImageFile && editImagePreview) {
                    URL.revokeObjectURL(editImagePreview);
                  }

                  if (editImageFile) {
                    setEditImageFile(null);
                    setEditImagePreview(null);
                    setRemoveExistingImage(false);
                    return;
                  }

                  if (post.imageUrl) {
                    setRemoveExistingImage(true);
                  }
                }}
                disabled={updateMutation.isPending}
              />
              {post.imageUrl && removeExistingImage && !editImageFile ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRemoveExistingImage(false)}
                  disabled={updateMutation.isPending}
                >
                  Keep current image
                </Button>
              ) : null}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              disabled={updateMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={submitEditPost}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete post?</DialogTitle>
            <DialogDescription>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteMutation.isPending}
              onClick={() => {
                deleteMutation.mutate(post.id, {
                  onSuccess: () => {
                    setIsDeleteDialogOpen(false);
                    toast.success("Post deleted");
                  },
                  onError: () => {
                    toast.error("Unable to delete post");
                  },
                });
              }}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
