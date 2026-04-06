"use client";

import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  CircleHelp,
  LogOut,
  Settings,
} from "lucide-react";

import { useLogout } from "@/features/auth/hooks/use-logout";
import { APP_ROUTES } from "@/shared/libs/constants";
import { useAuthStore } from "@/shared/libs/auth-store";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui-components/controls/dropdown-menu";
import { Button } from "@/shared/ui-components/controls/button";

export function ProfileDropdown() {
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogout();
  const fullName = user ? `${user.firstName} ${user.lastName}` : "Dylan Field";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-10 gap-2 rounded-md px-2 text-foreground hover:bg-transparent"
          aria-label="Open profile menu"
        >
          <UserAvatar
            size="sm"
            src={user?.profileImageUrl}
            firstName={user?.firstName}
            lastName={user?.lastName}
          />
          <span className="hidden text-sm font-semibold md:inline">
            {fullName}
          </span>
          <ChevronDown className="hidden size-4 text-foreground/70 md:inline" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-75 rounded-lg border border-border p-0"
      >
        <DropdownMenuLabel className="px-4 py-3">
          <div className="flex items-center gap-3">
            <UserAvatar
              size="lg"
              src={user?.profileImageUrl}
              firstName={user?.firstName}
              lastName={user?.lastName}
            />
            <div className="flex flex-col">
              <span className="text-base font-semibold text-foreground">
                {fullName}
              </span>
              <Link
                href={APP_ROUTES.profile}
                className="text-sm font-medium text-primary"
              >
                View Profile
              </Link>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="space-y-1 p-2">
          <DropdownMenuItem className="px-2 py-0 focus:bg-muted/60">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 py-2"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Settings className="size-5" />
                </span>
                <span className="text-md font-medium leading-none text-foreground">
                  Settings
                </span>
              </span>
              <ChevronRight className="size-4 text-foreground/60" />
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-2 py-0 focus:bg-muted/60">
            <button
              type="button"
              className="flex w-full items-center justify-between gap-3 py-2"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CircleHelp className="size-5" />
                </span>
                <span className="text-md font-medium leading-none text-foreground">
                  Help & Support
                </span>
              </span>
              <ChevronRight className="size-4 text-foreground/60" />
            </button>
          </DropdownMenuItem>

          <DropdownMenuItem className="px-2 py-0 focus:bg-muted/60">
            <button
              type="button"
              disabled={logoutMutation.isPending}
              onClick={() => logoutMutation.mutate()}
              className="flex w-full items-center justify-between gap-3 py-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <LogOut className="size-5" />
                </span>
                <span className="text-md font-medium leading-none text-foreground">
                  {logoutMutation.isPending ? "Logging out..." : "Log Out"}
                </span>
              </span>
              <ChevronRight className="size-4 text-foreground/60" />
            </button>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
