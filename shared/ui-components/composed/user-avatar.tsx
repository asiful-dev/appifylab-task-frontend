import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/ui-components/controls/avatar";

type UserAvatarProps = {
  src?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  size?: "sm" | "default" | "lg";
  className?: string;
};

function getInitials(firstName?: string | null, lastName?: string | null) {
  const first = firstName?.[0] ?? "";
  const last = lastName?.[0] ?? "";
  const initials = `${first}${last}`.trim();

  return initials || "U";
}

export function UserAvatar({
  src,
  firstName,
  lastName,
  size = "default",
  className,
}: UserAvatarProps) {
  return (
    <Avatar size={size} className={className}>
      <AvatarImage
        src={src ?? undefined}
        alt={`${firstName ?? ""} ${lastName ?? ""}`.trim()}
      />
      <AvatarFallback>{getInitials(firstName, lastName)}</AvatarFallback>
    </Avatar>
  );
}
