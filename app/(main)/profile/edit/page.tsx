import type { Metadata } from "next";

import { EditProfilePageContent } from "@/features/profile/components/edit-profile-page-content";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your BuddyScript profile, avatar, and password.",
  openGraph: {
    title: "Edit Profile | BuddyScript",
    description: "Update your BuddyScript profile, avatar, and password.",
  },
};

export default function EditProfilePage() {
  return <EditProfilePageContent />;
}
