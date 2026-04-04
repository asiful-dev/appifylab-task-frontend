import { TrendingTopics } from "@/features/layout/components/trending-topics";
import { YouMightLike } from "@/features/layout/components/you-might-like";
import { YourFriends } from "@/features/layout/components/your-friends";

export function RightSidebar() {
  return (
    <aside
      role="complementary"
      aria-label="Right sidebar"
      className="hidden space-y-4 md:block"
    >
      <YouMightLike />
      <YourFriends />
      {/* <TrendingTopics /> */}
    </aside>
  );
}
