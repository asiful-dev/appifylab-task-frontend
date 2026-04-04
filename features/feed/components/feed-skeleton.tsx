import { SkeletonPostCard } from "@/shared/ui-components/composed/skeleton-post-card";

export function FeedSkeleton() {
  return (
    <section aria-label="Loading feed">
      {Array.from({ length: 3 }).map((_, index) => (
        <SkeletonPostCard key={index} />
      ))}
    </section>
  );
}
