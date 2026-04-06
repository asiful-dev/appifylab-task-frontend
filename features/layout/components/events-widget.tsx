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

const events = [
  {
    id: "event-1",
    image: "/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    goingCount: "17 People Going",
  },
  {
    id: "event-2",
    image: "/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    goingCount: "17 People Going",
  },
];

export function EventsWidget() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle>Events</CardTitle>
        <CardAction>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            See all
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        {events.map((event) => (
          <article
            key={event.id}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <Image
              src={event.image}
              alt={event.title}
              width={320}
              height={190}
              loading="eager"
              className="h-auto w-full object-cover"
            />

            <div className="flex items-center gap-3 p-4">
              <div className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-xs bg-[#0ECB81] text-white">
                <span className="text-xl font-semibold leading-none">
                  {event.day}
                </span>
                <span className="text-sm leading-none">{event.month}</span>
              </div>
              <h3 className="text-lg font-semibold leading-snug text-foreground">
                {event.title}
              </h3>
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-3">
              <p className="text-xs text-muted-foreground">
                {event.goingCount}
              </p>
              <Button
                type="button"
                variant="outline"
                className="h-8 rounded-none border-primary bg-transparent px-4 text-base font-medium text-primary shadow-none hover:bg-transparent hover:text-primary"
              >
                Going
              </Button>
            </div>
          </article>
        ))}
      </CardContent>
    </Card>
  );
}
