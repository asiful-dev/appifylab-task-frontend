"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileInfo } from "@/features/profile/components/profile-info";
import { ProfilePosts } from "@/features/profile/components/profile-posts";
import { useMe } from "@/features/profile/hooks/use-me";
import { useUser } from "@/features/profile/hooks/use-user";
import { APP_ROUTES } from "@/shared/libs/constants";

export function PublicProfilePageContent({ userId }: { userId: string }) {
  const router = useRouter();
  const { data: me } = useMe();
  const { data: user, isLoading } = useUser(userId);

  useEffect(() => {
    if (me?.id && me.id === userId) {
      router.replace(APP_ROUTES.profile);
    }
  }, [me?.id, router, userId]);

  if (isLoading) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Loading profile...
      </p>
    );
  }

  if (!user) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        User not found.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <ProfileHeader user={user} isOwnProfile={false} />
      <ProfileInfo createdAt={user.createdAt} showEmail={false} />
      <ProfilePosts userId={user.id} isOwnProfile={false} />
    </div>
  );
}
