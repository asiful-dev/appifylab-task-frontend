"use client";

import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileInfo } from "@/features/profile/components/profile-info";
import { ProfilePosts } from "@/features/profile/components/profile-posts";
import { useMe } from "@/features/profile/hooks/use-me";

export function OwnProfilePageContent() {
  const { data: me, isLoading } = useMe();

  if (isLoading) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Loading profile...
      </p>
    );
  }

  if (!me) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Unable to load profile.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <ProfileHeader user={me} isOwnProfile />
      <ProfileInfo email={me.email} createdAt={me.createdAt} />
      <ProfilePosts userId={me.id} isOwnProfile />
    </div>
  );
}
