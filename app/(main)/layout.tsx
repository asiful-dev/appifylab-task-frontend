import type { ReactNode } from "react";

import { AuthRouteGuard } from "@/features/auth/components/auth-route-guard";
import { LogoutButton } from "@/features/auth/components/logout-button";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AuthRouteGuard mode="protected">
      <div className="min-h-screen bg-background">
        <header className="border-b border-border bg-card">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
            <p className="text-sm font-medium text-foreground">BuddyScript</p>
            <LogoutButton />
          </div>
        </header>
        <div className="mx-auto w-full max-w-6xl">{children}</div>
      </div>
    </AuthRouteGuard>
  );
}
