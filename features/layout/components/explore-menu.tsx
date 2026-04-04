import {
  CirclePlay,
  ChartColumn,
  UserRoundPlus,
  Bookmark,
  Users,
  Gamepad2,
  Settings,
  Save,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";

const items = [
  { label: "Learning", icon: CirclePlay, isNew: true },
  { label: "Insights", icon: ChartColumn },
  { label: "Find friends", icon: UserRoundPlus },
  { label: "Bookmarks", icon: Bookmark },
  { label: "Group", icon: Users },
  { label: "Gaming", icon: Gamepad2, isNew: true },
  { label: "Settings", icon: Settings },
  { label: "Save post", icon: Save },
];

export function ExploreMenu() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Explore</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-md px-1 py-1.5 text-left text-sm text-muted-foreground"
              >
                <span className="flex items-center gap-3">
                  <item.icon className="size-5" />
                  <span className="text-[14px] font-medium text-foreground/80 hover:text-primary cursor-pointer">
                    {item.label}
                  </span>
                </span>
                {item.isNew ? (
                  <span className="rounded-full bg-[#0ECB81] px-2 py-0.5 text-xs font-medium leading-none text-white">
                    New
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
