import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";

const items = [
  "Learning",
  "Insights",
  "Find Friends",
  "Bookmarks",
  "Group",
  "Gaming",
  "Settings",
  "Save Post",
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
            <li key={item}>
              <button
                type="button"
                className="w-full rounded-md px-2 py-1.5 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
