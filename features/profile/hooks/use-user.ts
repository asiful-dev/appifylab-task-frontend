"use client";

import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/features/profile/api/user.api";

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userApi.getUser(id),
    enabled: Boolean(id),
  });
}
