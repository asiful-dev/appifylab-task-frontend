"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import type { User } from "@/features/profile/api/user.api";
import { useUploadAvatar } from "@/features/profile/hooks/use-upload-avatar";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";

export function AvatarUpload({ user }: { user: User }) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const uploadAvatarMutation = useUploadAvatar();

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function handlePickFile() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function handleUpload() {
    if (!selectedFile) {
      toast.error("Please choose an image first");
      return;
    }

    try {
      await uploadAvatarMutation.mutateAsync(selectedFile);
      toast.success("Avatar updated");
      setSelectedFile(null);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch {
      toast.error("Unable to upload avatar");
    }
  }

  const imageSrc = previewUrl || user.profileImageUrl || "/images/profile.png";

  return (
    <div className="space-y-3">
      <div className="relative h-24 w-24">
        {previewUrl ? (
          <Image
            src={imageSrc}
            alt="Avatar preview"
            fill
            className="rounded-full object-cover"
          />
        ) : (
          <UserAvatar
            src={imageSrc}
            firstName={user.firstName}
            lastName={user.lastName}
            className="h-24 w-24"
          />
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={uploadAvatarMutation.isPending}
        onChange={handleFileChange}
      />

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={handlePickFile}
          disabled={uploadAvatarMutation.isPending}
        >
          Choose Image
        </Button>
        <Button
          type="button"
          onClick={handleUpload}
          disabled={!selectedFile || uploadAvatarMutation.isPending}
        >
          {uploadAvatarMutation.isPending ? "Uploading..." : "Upload Avatar"}
        </Button>
      </div>
    </div>
  );
}
