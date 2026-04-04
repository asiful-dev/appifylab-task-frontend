"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useCreatePost } from "@/features/feed/hooks/use-create-post";
import { PostImageUpload } from "@/features/feed/components/post-image-upload";
import { VisibilitySelector } from "@/features/feed/components/visibility-selector";
import type { PostVisibility } from "@/features/feed/utils/post.types";
import { useAuthStore } from "@/shared/libs/auth-store";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";
import { Card, CardContent } from "@/shared/ui-components/controls/card";

export function PostComposer() {
  const user = useAuthStore((state) => state.user);
  const createPostMutation = useCreatePost();
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<PostVisibility>("public");

  async function handleSubmit() {
    if (!content.trim() && !imageFile) {
      toast.error("Please add text or image before posting");
      return;
    }

    const formData = new FormData();

    if (content.trim()) {
      formData.append("content", content.trim());
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    formData.append("visibility", visibility);

    try {
      await createPostMutation.mutateAsync(formData);
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      setVisibility("public");
      toast.success("Post created");
    } catch {
      toast.error("Unable to create post");
    }
  }

  return (
    <Card className="mb-4">
      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <UserAvatar
            src={user?.profileImageUrl}
            firstName={user?.firstName}
            lastName={user?.lastName}
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="What's on your mind?"
            className="min-h-24 w-full resize-y rounded-md border border-input bg-background p-3 text-sm outline-none focus-visible:border-ring"
          />
        </div>

        <PostImageUpload
          preview={imagePreview}
          onSelect={(file) => {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
          }}
          onClear={() => {
            setImageFile(null);
            setImagePreview(null);
          }}
        />

        <div className="flex items-center justify-between gap-3">
          <VisibilitySelector value={visibility} onChange={setVisibility} />
          <Button
            type="button"
            className="h-10"
            disabled={createPostMutation.isPending}
            onClick={handleSubmit}
          >
            {createPostMutation.isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
