"use client";

import Link from "next/link";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="ghost" className="h-10 gap-2 px-2">
          <UserAvatar
            size="sm"
            src={user?.profileImageUrl}
            firstName={user?.firstName}
            lastName={user?.lastName}
          />
          <span className="hidden text-sm md:inline">
            {user ? `${user.firstName} ${user.lastName}` : "Profile"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          {user ? `${user.firstName} ${user.lastName}` : "My Account"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={APP_ROUTES.profile}>View Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Help & Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
        >
          {logoutMutation.isPending ? "Logging out..." : "Log Out"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
