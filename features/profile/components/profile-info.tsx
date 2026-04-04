import { Card, CardContent } from "@/shared/ui-components/controls/card";

function formatMemberSince(createdAt: string) {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

export function ProfileInfo({
  email,
  createdAt,
  showEmail = true,
}: {
  email?: string;
  createdAt: string;
  showEmail?: boolean;
}) {
  return (
    <Card>
      <CardContent className="space-y-3 pt-6">
        {showEmail && email ? (
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Email
            </p>
            <p className="mt-1 text-sm text-foreground">{email}</p>
          </div>
        ) : null}

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Member since
          </p>
          <p className="mt-1 text-sm text-foreground">
            {formatMemberSince(createdAt)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
