import { FileText } from "lucide-react";

import { EmptyState } from "@/shared/ui-components/composed/empty-state";

export function FeedEmpty() {
  return (
    <EmptyState
      icon={<FileText className="size-5" aria-hidden="true" />}
      title="No posts yet"
      description="No posts yet. Be the first to share something!"
    />
  );
}
