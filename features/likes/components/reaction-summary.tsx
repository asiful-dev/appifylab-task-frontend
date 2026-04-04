"use client";

import Image from "next/image";

const fallbackAvatars = [
  "/images/react_img1.png",
  "/images/react_img2.png",
  "/images/react_img3.png",
];

export function ReactionSummary({
  totalCount,
  onClick,
}: {
  totalCount: number;
  onClick: () => void;
}) {
  if (!totalCount) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
    >
      <span className="flex -space-x-2">
        {fallbackAvatars.map((avatar) => (
          <Image
            key={avatar}
            src={avatar}
            alt="Liker"
            width={18}
            height={18}
            className="rounded-full border border-background"
          />
        ))}
      </span>
      <span>{totalCount} likes</span>
    </button>
  );
}
