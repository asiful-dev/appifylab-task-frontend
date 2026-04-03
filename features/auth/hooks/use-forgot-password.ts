"use client";

import { useMutation } from "@tanstack/react-query";

import { authFeatureApi } from "@/features/auth/api/auth.api";
import type { ForgotPasswordInput } from "@/shared/validators/auth.schema";

type ForgotPasswordResponse = {
  message: string;
};

export function useForgotPassword() {
  return useMutation({
    mutationFn: (input: ForgotPasswordInput) =>
      authFeatureApi.forgotPassword<ForgotPasswordResponse>({
        email: input.email,
      }),
  });
}
