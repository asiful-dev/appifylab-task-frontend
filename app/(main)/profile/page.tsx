import type { Metadata } from "next";

import { OwnProfilePageContent } from "@/features/profile/components/own-profile-page-content";

export const metadata: Metadata = {
  title: "Profile",
};

export default function ProfilePage() {
  return <OwnProfilePageContent />;
}
