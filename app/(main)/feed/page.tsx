import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description: "Your social feed — latest posts and updates",
};

export default function FeedPlaceholderPage() {
  return (
    <main className="min-h-screen bg-background p-8">
      <h1 className="text-2xl font-semibold text-foreground">
        Feed coming soon
      </h1>
    </main>
  );
}
