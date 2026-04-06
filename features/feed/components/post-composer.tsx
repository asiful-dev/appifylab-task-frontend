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
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";
import { Card } from "@/shared/ui-components/controls/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui-components/controls/select";

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
  const [visibility, setVisibility] = useState<"public" | "private">("public");

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
        <UserAvatar
          size="default"
          src={user?.profileImageUrl}
          firstName={user?.firstName}
          lastName={user?.lastName}
          className="shrink-0"
        />
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
            variant="outline"
            className="absolute right-2 top-2 bg-background/90 text-foreground shadow-sm backdrop-blur-xs"
            onClick={handleClearImage}
            disabled={createPostMutation.isPending}
            aria-label="Remove selected image"
          >
            <X className="size-3.5" />
          </Button>
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-2 rounded-md bg-primary/10 px-2 py-2">
        <div className="flex min-w-0 items-center gap-0.5 sm:gap-1">
          {actionButtons.map((button) => (
            <Button
              key={button.label}
              type="button"
              variant="ghost"
              size="xs"
              disabled={createPostMutation.isPending}
              className="gap-1.5 px-1.5 text-sm text-muted-foreground hover:bg-transparent hover:text-primary"
              onClick={() => {
                if (button.action === "photo") {
                  fileInputRef.current?.click();
                }
              }}
            >
              <button.icon className="size-3.5" />
              {button.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={visibility}
            onValueChange={(value) =>
              setVisibility(value as "public" | "private")
            }
            disabled={createPostMutation.isPending}
          >
            <SelectTrigger className="h-8 min-w-21 bg-card">
              <SelectValue placeholder="Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>

          <Button
            type="button"
            size="sm"
            className="h-8 gap-1.5 bg-primary px-3 text-white hover:bg-primary/90"
            disabled={createPostMutation.isPending}
            onClick={handleSubmit}
          >
            <Send className="size-3" />
            {createPostMutation.isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
