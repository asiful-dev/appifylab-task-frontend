import { SkeletonProfile } from "@/shared/ui-components/composed/skeleton-profile";
import { SkeletonPostCard } from "@/shared/ui-components/composed/skeleton-post-card";

export function ProfileSkeleton() {
  return (
    <section className="space-y-4" aria-label="Loading profile">
      <SkeletonProfile />
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="skeleton mb-3 h-4 w-36" />
        <div className="skeleton h-3 w-48" />
      </div>
      <SkeletonPostCard />
      <SkeletonPostCard />
    </section>
  );
}
