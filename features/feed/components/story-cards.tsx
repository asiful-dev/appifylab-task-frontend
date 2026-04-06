import Image from "next/image";
import { ChevronRight, Plus } from "lucide-react";

const stories = [
  {
    id: "your-story",
    bg: "/images/card_ppl1.png",
    person: "/images/card_ppl1.png",
    name: "Your Story",
    isYourStory: true,
  },
  {
    id: "1",
    bg: "/images/photos1.png",
    person: "/images/mini_pic.png",
    name: "Ryan Roslansky",
  },
  {
    id: "2",
    bg: "/images/photos2.png",
    person: "/images/img1.png",
    name: "Ryan Roslansky",
  },
  {
    id: "3",
    bg: "/images/photos3.png",
    person: "/images/img2.png",
    name: "Ryan Roslansky",
  },
  {
    id: "4",
    bg: "/images/photos5.png",
    person: "/images/img3.png",
    name: "Ryan Roslansky",
  },
];

export function StoryCards() {
  return (
    <div className="mb-4">
      <div className="relative mb-4">
        <div className="flex gap-3 overflow-x-auto pb-2 pr-10 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {stories.map((story) => (
            <article
              key={story.id}
              className="relative h-44 w-35 shrink-0 overflow-hidden rounded-md"
            >
              {story.isYourStory ? (
                <>
                  <div className="relative h-29">
                    <Image
                      src={story.bg}
                      alt={story.name}
                      fill
                      sizes="140px"
                      className="object-cover"
                    />
                    <div className="absolute inset-x-0 -bottom-3 flex justify-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-white ring-2 ring-card">
                        <Plus className="size-3" />
                      </div>
                    </div>
                  </div>
                  <div className="flex h-section-lg items-end justify-center bg-[#112032] pb-3">
                    <p className="text-xs font-semibold text-white">
                      {story.name}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <Image
                    src={story.bg}
                    alt={story.name}
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                  <div className="absolute right-2 top-2 z-10">
                    <Image
                      src={story.person}
                      alt={story.name}
                      width={24}
                      height={24}
                      className="rounded-full border-2 border-white"
                    />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/50 to-transparent p-2 pt-8">
                    <p className="line-clamp-2 text-xs font-semibold leading-4 text-white">
                      {story.name}
                    </p>
                  </div>
                </>
              )}
            </article>
          ))}
        </div>

        <button
          type="button"
          className="absolute right-0 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90"
          aria-label="Scroll right"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
