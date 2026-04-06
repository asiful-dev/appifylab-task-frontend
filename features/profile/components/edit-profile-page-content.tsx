"use client";

import { AvatarUpload } from "@/features/profile/components/avatar-upload";
import { ChangePasswordForm } from "@/features/profile/components/change-password-form";
import { EditProfileForm } from "@/features/profile/components/edit-profile-form";
import { ProfileSkeleton } from "@/features/profile/components/profile-skeleton";
import { useMe } from "@/features/profile/hooks/use-me";
import { ErrorState } from "@/shared/ui-components/composed/error-state";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";

export function EditProfilePageContent() {
  const { data: me, isLoading, isError, refetch } = useMe();

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Failed to load profile settings"
        description="Please try again."
        onRetry={() => void refetch()}
      />
    );
  }

  if (!me) {
    return (
      <p className="py-10 text-center text-sm text-muted-foreground">
        Unable to load profile settings.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <AvatarUpload user={me} />
          <EditProfileForm user={me} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
