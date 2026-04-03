"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authFeatureApi } from "@/features/auth/api/auth.api";
import { APP_ROUTES } from "@/shared/libs/constants";
import { useAuthStore } from "@/shared/libs/auth-store";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);

  return useMutation({
    mutationFn: () => authFeatureApi.logout<{ message: string }>(),
    onSettled: () => {
      clearSession();
      queryClient.clear();
      router.push(APP_ROUTES.login);
    },
  });
}
