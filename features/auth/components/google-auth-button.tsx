"use client";

import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/shared/ui-components/controls/button";

export function GoogleAuthButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-12 w-full justify-center gap-2"
      onClick={() => toast.info("Google authentication coming soon")}
    >
      <Image src="/images/google.svg" alt="Google" width={18} height={18} />
      Continue with Google
    </Button>
  );
}
