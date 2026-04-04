import { PostComposer } from "@/features/feed/components/post-composer";
import { PostList } from "@/features/feed/components/post-list";
import { StoryCards } from "@/features/feed/components/story-cards";

export function FeedContainer() {
  return (
    <div className="w-full">
      <StoryCards />
      <PostComposer />
      <PostList />
    </div>
  );
}
