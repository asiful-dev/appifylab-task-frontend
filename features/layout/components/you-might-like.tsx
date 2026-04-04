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

const suggestions = [
  {
    id: "radovan-skillarena",
    name: "Radovan SkillArena",
    role: "Founder & CEO at Trophy",
    image: "/images/man.png",
  },
  {
    id: "charlotte-cole",
    name: "Charlotte Cole",
    role: "Founder & CEO at Trophy",
    image: "/images/img1.png",
  },
  {
    id: "mason-foster",
    name: "Mason Foster",
    role: "Founder & CEO at Trophy",
    image: "/images/img2.png",
  },
  {
    id: "harper-young",
    name: "Harper Young",
    role: "Founder & CEO at Trophy",
    image: "/images/img6.png",
  },
];

export function YouMightLike() {
  return (
    <Card className="py-4">
      <CardHeader>
        <CardTitle>You Might Like</CardTitle>
        <CardAction>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:text-primary/90"
          >
            See All
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="border-t border-border pt-4 first:border-t first:pt-2"
          >
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className="rounded-full object-cover cursor-pointer"
              />
              <div>
                <p className="text-md font-semibold text-foreground cursor-pointer">
                  {item.name}
                </p>
                <p className="text-sm text-muted-foreground">{item.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-md border-[#D0D5DD] bg-transparent text-base font-semibold text-[#98A2B3] shadow-none hover:bg-transparent hover:text-[#98A2B3] cursor-pointer"
              >
                Ignore
              </Button>
              <Button
                type="button"
                className="h-10 rounded-md bg-primary text-base font-semibold text-white hover:bg-primary/90 cursor-pointer"
              >
                Follow
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
