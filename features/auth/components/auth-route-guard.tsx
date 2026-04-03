"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  getAuthRedirectPath,
  getProtectedRedirectPath,
} from "@/features/auth/utils/auth-redirect";
import { useAuthStore } from "@/shared/libs/auth-store";
import { useAuth } from "@/shared/providers/auth-provider";

type GuardMode = "auth" | "protected";

export function AuthRouteGuard({
  mode,
  children,
}: {
  mode: GuardMode;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isReady } = useAuth();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const redirectPath =
      mode === "auth"
        ? getAuthRedirectPath(isAuthenticated)
        : getProtectedRedirectPath(isAuthenticated);

    if (redirectPath && redirectPath !== pathname) {
      router.replace(redirectPath);
    }
  }, [isAuthenticated, isReady, mode, pathname, router]);

  if (!isReady) {
    return <div className="min-h-screen bg-background" />;
  }

  const isBlocked =
    (mode === "auth" && isAuthenticated) ||
    (mode === "protected" && !isAuthenticated);

  if (isBlocked) {
    return <div className="min-h-screen bg-background" />;
  }

  return <>{children}</>;
}
