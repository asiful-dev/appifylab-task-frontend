"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authFeatureApi } from "@/features/auth/api/auth.api";
import { APP_ROUTES } from "@/shared/libs/constants";
import type { ResetPasswordInput } from "@/shared/validators/auth.schema";

type ResetPasswordResponse = {
  message: string;
};

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (input: ResetPasswordInput) =>
      authFeatureApi.resetPassword<ResetPasswordResponse>({
        token: input.token,
        password: input.password,
      }),
    onSuccess: () => {
      router.push(APP_ROUTES.login);
    },
  });
}
