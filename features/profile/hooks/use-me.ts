"use client";

import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/features/profile/api/user.api";

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userApi.getMe(),
  });
}
