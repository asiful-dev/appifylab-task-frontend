"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userApi } from "@/features/profile/api/user.api";
import { useAuthStore } from "@/shared/libs/auth-store";
import type { UpdateProfileInput } from "@/shared/validators/user.schema";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileInput) => userApi.updateMe(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["me"], updatedUser);
      useAuthStore.getState().setUser(updatedUser);
    },
  });
}
