"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export function AuthIllustration() {
  const pathname = usePathname();
  const isRegisterPage = pathname.includes("/register");

  if (isRegisterPage) {
    return (
      <>
        <Image
          src="/images/registration.png"
          alt="Registration illustration"
          width={760}
          height={580}
          className="h-auto w-full max-w-[760px] object-contain dark:hidden"
          priority
        />
        <Image
          src="/images/registration1.png"
          alt="Registration illustration"
          width={760}
          height={580}
          className="hidden h-auto w-full max-w-[760px] object-contain dark:block"
          priority
        />
      </>
    );
  }

  return (
    <Image
      src="/images/login.png"
      alt="Login illustration"
      width={760}
      height={580}
      className="h-auto w-full max-w-[760px] object-contain"
      priority
    />
  );
}
