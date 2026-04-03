import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";
import { Button } from "@/shared/ui-components/controls/button";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";

const suggestions = [
  { name: "Ethan Parker", image: "/images/recommend1.png" },
  { name: "Charlotte Cole", image: "/images/recommend2.png" },
  { name: "Mason Foster", image: "/images/recommend3.png" },
  { name: "Harper Young", image: "/images/recommend4.png" },
];

export function YouMightLike() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>You Might Like</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2">
              <UserAvatar
                src={item.image}
                firstName={item.name.split(" ")[0]}
                lastName={item.name.split(" ")[1]}
              />
              <p className="text-sm text-foreground">{item.name}</p>
            </div>
            <Button type="button" size="xs" variant="outline">
              Follow
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
