import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";
import { Button } from "@/shared/ui-components/controls/button";

const people = [
  {
    id: "steve-jobs",
    name: "Steve Jobs",
    role: "CEO of Apple",
    image: "/images/people1.png",
  },
  {
    id: "ryan-roslansky",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    image: "/images/people2.png",
  },
  {
    id: "dylan-field",
    name: "Dylan Field",
    role: "CEO of Figma",
    image: "/images/people3.png",
  },
];

export function SuggestedPeople() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle>Suggested People</CardTitle>
        <CardAction>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            See All
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-5 pb-4">
        {people.map((person) => (
          <div
            key={person.id}
            className="flex items-center justify-between gap-3"
          >
            <Link
              href={`/profile/${person.id}`}
              className="flex min-w-0 items-center gap-3"
            >
              <Image
                src={person.image}
                alt={person.name}
                width={42}
                height={42}
                className="rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground cursor-pointer">
                  {person.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {person.role}
                </p>
              </div>
            </Link>
            <Button
              type="button"
              variant="outline"
              className="h-8 rounded-none border-[#D0D5DD] bg-transparent px-4 text-sm font-semibold text-[#98A2B3] shadow-none hover:bg-transparent hover:text-[#98A2B3] cursor-pointer"
            >
              Connect
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
