import type { ReactNode } from "react";

import { AuthRouteGuard } from "@/features/auth/components/auth-route-guard";
import { DarkModeToggle } from "@/features/layout/components/dark-mode-toggle";
import { DesktopNavbar } from "@/features/layout/components/desktop-navbar";
import { LeftSidebar } from "@/features/layout/components/left-sidebar";
import { MobileBottomNav } from "@/features/layout/components/mobile-bottom-nav";
import { MobileTopBar } from "@/features/layout/components/mobile-top-bar";
import { RightSidebar } from "@/features/layout/components/right-sidebar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <AuthRouteGuard mode="protected">
      <div className="min-h-screen bg-background pb-16 lg:h-screen lg:overflow-hidden lg:pb-0">
        <DesktopNavbar />
        <MobileTopBar />

        <main
          role="main"
          className="mx-auto w-full max-w-330 px-4 py-4 lg:box-border lg:h-[calc(100vh-78px)] lg:overflow-hidden"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 lg:h-full lg:gap-6">
            <div className="md:col-span-3 lg:h-full lg:overflow-y-auto lg:scroll-smooth lg:[scrollbar-width:none] lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden">
              <LeftSidebar />
            </div>

            <section
              aria-label="Main content"
              className="md:col-span-9 lg:col-span-6 lg:h-full lg:overflow-y-auto lg:scroll-smooth lg:[scrollbar-width:none] lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden"
            >
              {children}
            </section>

            <div className="md:col-span-3 lg:h-full lg:overflow-y-auto lg:scroll-smooth lg:[scrollbar-width:none] lg:[-ms-overflow-style:none] lg:[&::-webkit-scrollbar]:hidden">
              <RightSidebar />
            </div>
          </div>
        </main>

        <DarkModeToggle />
        <MobileBottomNav />
      </div>
    </AuthRouteGuard>
  );
}
