"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authFeatureApi } from "@/features/auth/api/auth.api";
import { APP_ROUTES } from "@/shared/libs/constants";
import { useAuthStore, type AuthUser } from "@/shared/libs/auth-store";
import type { LoginInput } from "@/shared/validators/auth.schema";

type LoginResponse = {
  user: AuthUser;
  accessToken: string;
};

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      return authFeatureApi.login<LoginResponse>({
        email: input.email,
        password: input.password,
        rememberMe: input.rememberMe,
      });
    },
    onSuccess: (response) => {
      setSession(response.user, response.accessToken);
      router.push(APP_ROUTES.feed);
    },
  });
}
