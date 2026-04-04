export function SkeletonPostCard() {
  return (
    <article className="mb-4 rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-start gap-3">
        <div className="skeleton h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-40" />
          <div className="skeleton h-3 w-24" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-11/12" />
        <div className="skeleton h-48 w-full" />
      </div>
      <div className="mt-4 flex items-center gap-3">
        <div className="skeleton h-8 w-16" />
        <div className="skeleton h-8 w-20" />
        <div className="skeleton h-8 w-14" />
      </div>
    </article>
  );
}
