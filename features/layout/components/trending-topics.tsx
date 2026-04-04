import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/ui-components/controls/card";

const topics = [
  "#DesignSystems",
  "#NextJS",
  "#FrontendDev",
  "#UXResearch",
  "#WebPerformance",
];

export function TrendingTopics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {topics.map((topic) => (
            <li key={topic} className="text-sm text-primary">
              {topic}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
