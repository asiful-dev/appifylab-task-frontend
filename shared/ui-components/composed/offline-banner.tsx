"use client";

import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(
    typeof navigator !== "undefined" ? !navigator.onLine : false,
  );

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  if (!isOffline) {
    return null;
  }

  return (
    <div className="fixed top-0 right-0 left-0 z-60 border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
      <p className="mx-auto flex max-w-4xl items-center justify-center gap-2">
        <WifiOff className="size-4" aria-hidden="true" />
        You&apos;re offline. Check your connection.
      </p>
    </div>
  );
}
