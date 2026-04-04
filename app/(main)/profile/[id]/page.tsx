import type { Metadata } from "next";

import { PublicProfilePageContent } from "@/features/profile/components/public-profile-page-content";

export const metadata: Metadata = {
  title: "User Profile",
  description: "View a BuddyScript user's public profile and posts.",
  openGraph: {
    title: "User Profile | BuddyScript",
    description: "View a BuddyScript user's public profile and posts.",
  },
};

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <PublicProfilePageContent userId={id} />;
}
