import Image from "next/image";
import Link from "next/link";

import { mainNavItems } from "@/features/layout/utils/nav-items";
import { NotificationDropdown } from "@/features/layout/components/notification-dropdown";
import { ProfileDropdown } from "@/features/layout/components/profile-dropdown";
import { SearchBar } from "@/features/layout/components/search-bar";
import { cn } from "@/shared/libs/shadcn-config";

export function DesktopNavbar() {
  return (
    <header className="sticky top-0 z-40 hidden border-b border-border bg-card lg:block">
      <div className="mx-auto flex h-[72px] w-full max-w-[1320px] items-center gap-4 px-4">
        <Link href="/feed" className="shrink-0">
          <Image
            src="/images/logo.svg"
            alt="BuddyScript"
            width={124}
            height={40}
            priority
          />
        </Link>

        <div className="flex-1">
          <SearchBar />
        </div>

        <nav role="navigation" aria-label="Primary">
          <ul className="flex items-center gap-2">
            {mainNavItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                    item.key === "feed" && "text-primary",
                  )}
                >
                  <i className={item.iconClass} aria-hidden="true" />
                  <span className="hidden xl:inline">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <NotificationDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
