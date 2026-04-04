import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";
import { Button } from "@/shared/ui-components/controls/button";
import { UserAvatar } from "@/shared/ui-components/composed/user-avatar";

const people = [
  { id: "ariana-jordan", name: "Ariana Jordan", image: "/images/people1.png" },
  { id: "liam-hudson", name: "Liam Hudson", image: "/images/people2.png" },
  { id: "sophia-reed", name: "Sophia Reed", image: "/images/people3.png" },
];

export function SuggestedPeople() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested People</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {people.map((person) => (
          <div
            key={person.name}
            className="flex items-center justify-between gap-2"
          >
            <Link
              href={`/profile/${person.id}`}
              className="flex items-center gap-2"
            >
              <UserAvatar
                src={person.image}
                firstName={person.name.split(" ")[0]}
                lastName={person.name.split(" ")[1]}
              />
              <p className="text-sm text-foreground hover:underline">
                {person.name}
              </p>
            </Link>
            <Button type="button" size="xs" variant="outline">
              Connect
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
