import Image from "next/image";
import Link from "next/link";

import type { User } from "@/features/profile/api/user.api";
import { APP_ROUTES } from "@/shared/libs/constants";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";
import { Button } from "@/shared/ui-components/controls/button";
import { Card } from "@/shared/ui-components/controls/card";

export function ProfileHeader({
  user,
  isOwnProfile,
}: {
  user: User;
  isOwnProfile: boolean;
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 bg-gradient-to-r from-primary/90 to-blue-400">
        <Image
          src="/images/profile-cover-img.png"
          alt="Profile cover"
          fill
          className="object-cover opacity-35"
          priority
        />
      </div>

      <div className="relative px-6 pb-6">
        <UserAvatar
          src={user.profileImageUrl}
          firstName={user.firstName}
          lastName={user.lastName}
          className="absolute -top-12 left-6 h-24 w-24 border-4 border-card"
        />

        <div className="pt-14">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {user.firstName} {user.lastName}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {user.bio?.trim() || "No bio yet."}
              </p>
            </div>

            {isOwnProfile ? (
              <Button type="button" variant="outline" asChild>
                <Link href={APP_ROUTES.profileEdit}>Edit Profile</Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </Card>
  );
}
