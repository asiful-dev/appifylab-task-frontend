"use client";

import { useMutation } from "@tanstack/react-query";

import { userApi } from "@/features/profile/api/user.api";

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

export function useChangePassword() {
  return useMutation({
    mutationFn: (input: ChangePasswordPayload) => userApi.changePassword(input),
  });
}
