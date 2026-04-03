import type { ReactNode } from "react";

import { AuthIllustration } from "@/features/auth/components/auth-illustration";
import { AuthRouteGuard } from "@/features/auth/components/auth-route-guard";
import { AuthShapes } from "@/features/auth/components/auth-shapes";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthRouteGuard mode="auth">
      <div className="relative min-h-screen overflow-hidden bg-background">
        <AuthShapes />
        <div className="relative z-10 grid min-h-screen grid-cols-1 lg:grid-cols-12">
          <aside className="hidden items-center justify-center px-10 lg:col-span-8 lg:flex">
            <AuthIllustration />
          </aside>
          <main className="col-span-1 flex items-center justify-center p-4 lg:col-span-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </AuthRouteGuard>
  );
}
