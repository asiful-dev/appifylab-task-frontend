import type { Metadata } from "next";

import { EditProfilePageContent } from "@/features/profile/components/edit-profile-page-content";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default function EditProfilePage() {
  return <EditProfilePageContent />;
}
