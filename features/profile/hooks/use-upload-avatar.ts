"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "@/features/profile/api/user.api";
import { useAuthStore } from "@/shared/libs/auth-store";

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("image", file);
      return userApi.uploadAvatar(formData);
    },
    onSuccess: async (result) => {
      const currentUser = useAuthStore.getState().user;

      if (currentUser && result.profileImageUrl) {
        useAuthStore.getState().setUser({
          ...currentUser,
          profileImageUrl: result.profileImageUrl,
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
