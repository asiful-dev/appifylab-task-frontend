import { MessageCircle } from "lucide-react";

import { EmptyState } from "@/shared/ui-components/composed/empty-state";

export function CommentsEmpty() {
  return (
    <EmptyState
      icon={<MessageCircle className="size-5" aria-hidden="true" />}
      title="No comments yet"
      description="No comments yet. Start the conversation!"
    />
  );
}
