"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ErrorBoundary } from "@/shared/ui-components/composed/error-boundary";
import { ErrorState } from "@/shared/ui-components/composed/error-state";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileInfo } from "@/features/profile/components/profile-info";
import { ProfilePosts } from "@/features/profile/components/profile-posts";
import { ProfileSkeleton } from "@/features/profile/components/profile-skeleton";
import { useMe } from "@/features/profile/hooks/use-me";
import { useUser } from "@/features/profile/hooks/use-user";
import { APP_ROUTES } from "@/shared/libs/constants";

export function PublicProfilePageContent({ userId }: { userId: string }) {
  const router = useRouter();
  const { data: me } = useMe();
  const { data: user, isLoading, isError, refetch } = useUser(userId);

  useEffect(() => {
    if (me?.id && me.id === userId) {
      router.replace(APP_ROUTES.profile);
    }
  }, [me?.id, router, userId]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load profile"
        description="Please try again."
        onRetry={() => void refetch()}
      />
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
    <ErrorBoundary>
      <div className="space-y-4">
        <ProfileHeader user={user} isOwnProfile={false} />
        <ProfileInfo createdAt={user.createdAt} showEmail={false} />
        <ProfilePosts userId={user.id} isOwnProfile={false} />
      </div>
    </ErrorBoundary>
  );
}
