import type { Metadata } from "next";

import { RegisterForm } from "@/features/auth/components/register-form";

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new BuddyScript account",
  openGraph: {
    title: "Register | BuddyScript",
    description: "Create a new BuddyScript account",
  },
};

export default function RegisterPage() {
  return <RegisterForm />;
}
