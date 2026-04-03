"use client";

import { LogOut } from "lucide-react";

import { useLogout } from "@/features/auth/hooks/use-logout";
import { Button } from "@/shared/ui-components/controls/button";

export function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className="gap-2"
    >
      <LogOut className="size-4" />
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
