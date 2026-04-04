"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, Menu, MessageCircle, Users } from "lucide-react";

import { cn } from "@/shared/libs/shadcn-config";

const navItems = [
  { href: "/feed", label: "Home", icon: Home },
  { href: "#", label: "Friends", icon: Users },
  { href: "#", label: "Notifications", icon: Bell },
  { href: "#", label: "Chat", icon: MessageCircle },
  { href: "#", label: "Menu", icon: Menu },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-border bg-card lg:hidden">
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
      </ul>
    </nav>
  );
}
