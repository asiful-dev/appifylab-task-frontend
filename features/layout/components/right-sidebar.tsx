import { TrendingTopics } from "@/features/layout/components/trending-topics";
import { YouMightLike } from "@/features/layout/components/you-might-like";

export function RightSidebar() {
  return (
    <aside
      role="complementary"
      aria-label="Right sidebar"
      className="hidden space-y-4 md:block"
    >
      <YouMightLike />
      <TrendingTopics />
    </aside>
  );
}
