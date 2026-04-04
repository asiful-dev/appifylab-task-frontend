"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

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
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Checking session...
        </div>
      </div>
    );
  }

  const isBlocked =
    (mode === "auth" && isAuthenticated) ||
    (mode === "protected" && !isAuthenticated);

  if (isBlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          role="status"
          aria-live="polite"
        >
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          Redirecting...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
