"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authFeatureApi } from "@/features/auth/api/auth.api";
import { APP_ROUTES } from "@/shared/libs/constants";
import { useAuthStore, type AuthUser } from "@/shared/libs/auth-store";
import type { RegisterInput } from "@/shared/validators/auth.schema";

type AuthResponse = {
  user: AuthUser;
  accessToken: string;
};

export function useRegister() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      return authFeatureApi.register<AuthResponse>({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      });
    },
    onSuccess: (response) => {
      setSession(response.user, response.accessToken);
      router.push(APP_ROUTES.feed);
    },
  });
}
