import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";

const friends = [
  {
    id: "steve-jobs-1",
    name: "Steve Jobs",
    role: "CEO of Apple",
    image: "/images/people1.png",
    lastSeen: "5 minute ago",
  },
  {
    id: "ryan-roslansky-1",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    image: "/images/people2.png",
    isOnline: true,
  },
  {
    id: "dylan-field-1",
    name: "Dylan Field",
    role: "CEO of Figma",
    image: "/images/people3.png",
    isOnline: true,
  },
  {
    id: "steve-jobs-2",
    name: "Steve Jobs",
    role: "CEO of Apple",
    image: "/images/people1.png",
    lastSeen: "5 minute ago",
  },
  {
    id: "ryan-roslansky-2",
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    image: "/images/people2.png",
    isOnline: true,
  },
  {
    id: "dylan-field-2",
    name: "Dylan Field",
    role: "CEO of Figma",
    image: "/images/people3.png",
    isOnline: true,
  },
  {
    id: "dylan-field-3",
    name: "Dylan Field",
    role: "CEO of Figma",
    image: "/images/people3.png",
    isOnline: true,
  },
  {
    id: "steve-jobs-3",
    name: "Steve Jobs",
    role: "CEO of Apple",
    image: "/images/people1.png",
    lastSeen: "5 minute ago",
  },
];

export function YourFriends() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle>Your Friends</CardTitle>
        <CardAction>
          <Link
            href="/find-friends"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            See All
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent className="pb-4">
        <label className="mb-4 flex h-10 w-full items-center gap-2 rounded-full bg-muted px-4">
          <Search className="size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="input search text"
            aria-label="Search friends"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="space-y-8">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center justify-between gap-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <Image
                  src={friend.image}
                  alt={friend.name}
                  width={42}
                  height={42}
                  className="rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-md font-semibold text-foreground">
                    {friend.name}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {friend.role}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                {friend.isOnline ? (
                  <span className="block size-3 rounded-full bg-[#0ACF83]" />
                ) : (
                  <span className="text-sm text-muted-foreground">
                    {friend.lastSeen}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
