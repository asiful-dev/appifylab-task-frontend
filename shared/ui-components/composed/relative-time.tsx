import { formatDate } from "@/shared/utils/format-date";

export function RelativeTime({
  value,
  className,
}: {
  value: string | number | Date;
  className?: string;
}) {
  return <span className={className}>{formatDate(value)}</span>;
}
