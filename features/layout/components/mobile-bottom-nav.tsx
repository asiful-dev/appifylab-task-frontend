"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronRight,
  CircleHelp,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

import { useLogout } from "@/features/auth/hooks/use-logout";
import { APP_ROUTES } from "@/shared/libs/constants";
import { useAuthStore } from "@/shared/libs/auth-store";
import { cn } from "@/shared/libs/shadcn-config";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/ui-components/controls/sheet";

const navItems = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "#", label: "Friends", icon: Users },
  { href: "#", label: "Notifications", icon: Bell },
  { href: "#", label: "Chat", icon: MessageCircle },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();
  const fullName = user ? `${user.firstName} ${user.lastName}` : "User";

  return (
    <nav
      role="navigation"
      aria-label="Mobile navigation"
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-card lg:hidden"
    >
      <ul className="grid grid-cols-5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 text-xs",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            </li>
          );
        })}

        <li>
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-14 w-full flex-col items-center justify-center gap-1 text-xs text-muted-foreground"
                aria-label="Open profile menu"
              >
                <Menu className="size-4" />
                Menu
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[88%] max-w-sm p-0">
              <div className="flex h-full flex-col">
                <SheetHeader className="border-b border-border px-4 py-4 text-left">
                  <SheetTitle>Profile Menu</SheetTitle>
                  <SheetDescription>
                    Quick access to your account.
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-1 border-b border-border px-4 py-4">
                  <div className="flex items-center gap-3">
                    <UserAvatar
                      size="lg"
                      src={user?.profileImageUrl}
                      firstName={user?.firstName}
                      lastName={user?.lastName}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-base font-semibold text-foreground">
                        {fullName}
                      </p>
                      <SheetClose asChild>
                        <Link
                          href={APP_ROUTES.profile}
                          className="text-sm font-medium text-primary"
                        >
                          View Profile
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 p-3">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-muted"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Settings className="size-5" />
                      </span>
                      <span className="text-md font-medium text-foreground">
                        Settings
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </button>

                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 rounded-md px-2 py-2 hover:bg-muted"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CircleHelp className="size-5" />
                      </span>
                      <span className="text-md font-medium text-foreground">
                        Help & Support
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </button>

                  <Button
                    type="button"
                    variant="ghost"
                    disabled={logoutMutation.isPending}
                    onClick={() => logoutMutation.mutate()}
                    className="h-auto w-full justify-between rounded-md px-2 py-2 text-left hover:bg-muted"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <LogOut className="size-5" />
                      </span>
                      <span className="text-md font-medium text-foreground">
                        {logoutMutation.isPending
                          ? "Logging out..."
                          : "Log Out"}
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}
