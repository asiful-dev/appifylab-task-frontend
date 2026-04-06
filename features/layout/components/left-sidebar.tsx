import { EventsWidget } from "@/features/layout/components/events-widget";
import { ExploreMenu } from "@/features/layout/components/explore-menu";
import { SuggestedPeople } from "@/features/layout/components/suggested-people";

export function LeftSidebar() {
  return (
    <aside
      role="complementary"
      aria-label="Left sidebar"
      className="hidden space-y-4 lg:block"
    >
      <ExploreMenu />
      <SuggestedPeople />
      <EventsWidget />
    </aside>
  );
}
