import Image from "next/image";
import { Search } from "lucide-react";

import { Button } from "@/shared/ui-components/controls/button";

export function MobileTopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between">
        <Image
          src="/images/logo.svg"
          alt="BuddyScript"
          width={110}
          height={36}
        />
        <Button type="button" variant="ghost" size="icon" aria-label="Search">
          <Search className="size-5" />
        </Button>
      </div>
    </header>
  );
}
