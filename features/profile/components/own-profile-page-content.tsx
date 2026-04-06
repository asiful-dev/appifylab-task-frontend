"use client";

import { ErrorBoundary } from "@/shared/ui-components/composed/error-boundary";
import { ErrorState } from "@/shared/ui-components/composed/error-state";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { ProfileInfo } from "@/features/profile/components/profile-info";
import { ProfilePosts } from "@/features/profile/components/profile-posts";
import { ProfileSkeleton } from "@/features/profile/components/profile-skeleton";
import { useMe } from "@/features/profile/hooks/use-me";

export function OwnProfilePageContent() {
  const { data: me, isLoading, isError, refetch } = useMe();

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

  if (!me) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Unable to load profile.
      </p>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <ProfileHeader user={me} isOwnProfile />
        <ProfileInfo email={me.email} createdAt={me.createdAt} />
        <ProfilePosts userId={me.id} isOwnProfile />
      </div>
    </ErrorBoundary>
  );
}
