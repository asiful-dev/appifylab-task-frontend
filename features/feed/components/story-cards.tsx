import Image from "next/image";

const stories = [
  {
    bg: "/images/slider1.png",
    person: "/images/card_ppl1.png",
    name: "Olivia",
  },
  { bg: "/images/slider2.png", person: "/images/card_ppl2.png", name: "Mason" },
  { bg: "/images/slider3.png", person: "/images/card_ppl3.png", name: "Ava" },
  { bg: "/images/slider4.png", person: "/images/card_ppl4.png", name: "Noah" },
];

export function StoryCards() {
  return (
    <section className="mb-4 overflow-x-auto">
      <div className="flex min-w-max gap-3">
        {stories.map((story) => (
          <article
            key={story.name}
            className="relative h-44 w-28 shrink-0 overflow-hidden rounded-md border border-border"
          >
            <Image
              src={story.bg}
              alt={story.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
              <div className="mb-2">
                <Image
                  src={story.person}
                  alt={story.name}
                  width={28}
                  height={28}
                  className="rounded-full border border-white"
                />
              </div>
              <p className="text-xs text-white">{story.name}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
