import Image from "next/image";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";

export function EventsWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Image
          src="/images/feed_event1.png"
          alt="Event"
          width={320}
          height={190}
          className="h-auto w-full rounded-md object-cover"
        />
        <h3 className="text-sm font-medium text-foreground">
          UI Design Meetup
        </h3>
        <p className="text-xs text-muted-foreground">Fri, 7:30 PM · Dhaka</p>
      </CardContent>
    </Card>
  );
}
