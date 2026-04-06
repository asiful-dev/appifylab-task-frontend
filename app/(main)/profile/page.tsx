import type { Metadata } from "next";

import { OwnProfilePageContent } from "@/features/profile/components/own-profile-page-content";

export const metadata: Metadata = {
  title: "Profile",
  description: "View your BuddyScript profile and recent posts.",
  openGraph: {
    title: "Profile | BuddyScript",
    description: "View your BuddyScript profile and recent posts.",
  },
};

export default function ProfilePage() {
  return <OwnProfilePageContent />;
}
