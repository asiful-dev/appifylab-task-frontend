import type { QueryKey } from "@tanstack/react-query";

import { ApiError } from "@/shared/libs/api-client";

const NON_RETRYABLE_STATUSES = [400, 401, 403, 404, 409, 429];

export function shouldRetry(
  failureCount: number,
  error: unknown,
  queryKey?: QueryKey,
): boolean {
  const scope = String(queryKey?.[0] ?? "");

  if (scope === "me") {
    return false;
  }

  if (error instanceof ApiError) {
    if (NON_RETRYABLE_STATUSES.includes(error.status)) {
      return false;
    }
  }

  return failureCount < 2;
}

export function defaultRetryDelay(attemptIndex: number): number {
  return Math.min(1000 * 2 ** attemptIndex, 10_000);
}
