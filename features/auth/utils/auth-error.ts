import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

import { ApiError } from "@/shared/libs/api-client";

type ApiErrorDetail = {
  field?: string;
  path?: string;
  message?: string;
};

export function applyApiFieldErrors<TFieldValues extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<TFieldValues>,
) {
  if (!(error instanceof ApiError) || !Array.isArray(error.details)) {
    return false;
  }

  let applied = false;

  for (const detail of error.details as ApiErrorDetail[]) {
    const field = detail.field || detail.path;
    const message = detail.message;

    if (field && message) {
      setError(field as Path<TFieldValues>, { message });
      applied = true;
    }
  }

  return applied;
}

export function getAuthErrorMessage(error: unknown) {
  if (!(error instanceof ApiError)) {
    return "Something went wrong. Please try again.";
  }

  if (error.status === 401) {
    return "Invalid email or password";
  }

  if (error.status === 409) {
    return "Email is already registered";
  }

  if (error.status === 429) {
    return "Too many attempts. Please try again in a few minutes.";
  }

  if (error.status >= 500) {
    return "Something went wrong. Please try again.";
  }

  return error.message || "Something went wrong. Please try again.";
}
