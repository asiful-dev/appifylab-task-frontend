export function SkeletonComment() {
  return (
    <div className="flex items-start gap-3">
      <div className="skeleton h-8 w-8 rounded-full" />
      <div className="w-full space-y-2">
        <div className="rounded-md bg-muted p-3">
          <div className="skeleton mb-2 h-3 w-28" />
          <div className="skeleton h-3 w-full" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-6 w-14" />
          <div className="skeleton h-6 w-12" />
        </div>
      </div>
    </div>
  );
}
