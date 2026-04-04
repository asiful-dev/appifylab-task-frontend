"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  Image as ImageIcon,
  Video,
  Calendar,
  FileText,
  PencilLine,
  Send,
  X,
} from "lucide-react";

import { useCreatePost } from "@/features/feed/hooks/use-create-post";
import { useAuthStore } from "@/shared/libs/auth-store";
import { Button } from "@/shared/ui-components/controls/button";
import { Card } from "@/shared/ui-components/controls/card";

const actionButtons = [
  { icon: ImageIcon, label: "Photo", action: "photo" as const },
  { icon: Video, label: "Video" },
  { icon: Calendar, label: "Event" },
  { icon: FileText, label: "Article" },
];

export function PostComposer() {
  const user = useAuthStore((state) => state.user);
  const createPostMutation = useCreatePost();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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

    formData.append("visibility", "public");

    try {
      await createPostMutation.mutateAsync(formData);
      setContent("");
      setImageFile(null);
      setImagePreview(null);
      toast.success("Post created");
    } catch {
      toast.error("Unable to create post");
    }
  }

  function handleSelectImage(file: File) {
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleClearImage() {
    setImageFile(null);
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <Card className="mb-4 rounded-md border border-border bg-card p-5">
      <div className="mb-4 flex gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
          {user?.profileImageUrl ? (
            <Image
              src={user.profileImageUrl}
              alt={user.firstName || "User"}
              width={40}
              height={40}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-primary" />
          )}
        </div>
        <div className="relative flex-1">
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write something ..."
            disabled={createPostMutation.isPending}
            className="min-h-24 w-full resize-none border-0 bg-transparent p-0 pr-8 pt-1 text-xl text-foreground outline-none placeholder:text-muted-foreground"
          />
          <PencilLine className="pointer-events-none absolute right-1 top-2 size-4 text-muted-foreground" />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            disabled={createPostMutation.isPending}
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                handleSelectImage(file);
              }
            }}
          />
        </div>
      </div>

      {imagePreview ? (
        <div className="relative mb-4 overflow-hidden rounded-md border border-border">
          <Image
            src={imagePreview}
            alt="Selected preview"
            width={640}
            height={360}
            className="h-auto max-h-72 w-full object-cover"
          />
          <Button
            type="button"
            size="icon-xs"
            variant="destructive"
            className="absolute right-2 top-2"
            onClick={handleClearImage}
            disabled={createPostMutation.isPending}
            aria-label="Remove selected image"
          >
            <X className="size-3" />
          </Button>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-3 rounded-md bg-primary/10 px-3 py-2">
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          {actionButtons.map((button) => (
            <Button
              key={button.label}
              type="button"
              variant="ghost"
              size="sm"
              disabled={createPostMutation.isPending}
              className="gap-2 px-2.5 text-base text-muted-foreground hover:text-primary hover:bg-transparent"
              onClick={() => {
                if (button.action === "photo") {
                  fileInputRef.current?.click();
                }
              }}
            >
              <button.icon className="size-4" />
              {button.label}
            </Button>
          ))}
        </div>
        <Button
          type="button"
          size="lg"
          className="gap-2 bg-primary text-white hover:bg-primary/90"
          disabled={createPostMutation.isPending}
          onClick={handleSubmit}
        >
          <Send className="size-3" />
          {createPostMutation.isPending ? "Posting..." : "Post"}
        </Button>
      </div>
    </Card>
  );
}
