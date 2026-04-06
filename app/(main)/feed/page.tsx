import type { Metadata } from "next";
import { FeedContainer } from "@/features/feed/components/feed-container";

export const metadata: Metadata = {
  title: "Feed",
  description: "Your social feed — latest posts and updates",
  openGraph: {
    title: "Feed | BuddyScript",
    description: "Your social feed — latest posts and updates",
  },
};

export default function FeedPage() {
  return <FeedContainer />;
}
