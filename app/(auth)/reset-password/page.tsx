import type { Metadata } from "next";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new BuddyScript password",
  openGraph: {
    title: "Reset Password | BuddyScript",
    description: "Set a new BuddyScript password",
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
