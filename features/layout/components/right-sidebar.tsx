import { TrendingTopics } from "@/features/layout/components/trending-topics";
import { YouMightLike } from "@/features/layout/components/you-might-like";

export function RightSidebar() {
  return (
    <aside className="hidden space-y-4 md:block">
      <YouMightLike />
      <TrendingTopics />
    </aside>
  );
}
