import { API_BASE_URL, API_ROUTES } from "@/shared/libs/constants";
import { useAuthStore } from "@/shared/libs/auth-store";
import { getCsrfToken } from "@/shared/utils/csrf";

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta?: { nextCursor: string | null; hasMore: boolean };
}

export interface ApiErrorResponse {
  success: false;
  error: { code: string; message: string; details?: unknown[] };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export class ApiError extends Error {
  code: string;
  status: number;
  details?: unknown[];

  constructor(
    code: string,
    message: string,
    status: number,
    details?: unknown[],
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.details = details;
  }
}

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type QueryValue = string | number | boolean | null | undefined;

interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
  body?: unknown;
  method?: HttpMethod;
  query?: Record<string, QueryValue>;
  csrf?: boolean;
  retryOnAuthFailure?: boolean;
}

function buildUrl(path: string, query?: Record<string, QueryValue>) {
  const url = new URL(
    path.replace(/^\//, ""),
    API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`,
  );

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value === null || value === undefined || value === "") {
        continue;
      }

      url.searchParams.set(key, String(value));
    }
  }

  return url.toString();
}

function isFormData(value: unknown): value is FormData {
  return typeof FormData !== "undefined" && value instanceof FormData;
}

function buildHeaders(
  initHeaders?: HeadersInit,
  method: HttpMethod = "GET",
  csrf = false,
) {
  const headers = new Headers(initHeaders);
  const accessToken = useAuthStore.getState().accessToken;

  headers.set("Accept", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  if (csrf && ["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
    const csrfToken = getCsrfToken();

    if (csrfToken) {
      headers.set("x-csrf-token", csrfToken);
    }
  }

  return headers;
}

async function parseBody<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text().then((text) => (text ? text : null));

  if (response.ok) {
    if (payload && typeof payload === "object" && "success" in payload) {
      const envelope = payload as ApiResponse<T>;

      if (envelope.success) {
        return envelope.data;
      }
    }

    return payload as T;
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get("retry-after");
    const message = retryAfter
      ? `Too many requests. Please try again in ${retryAfter} seconds.`
      : "Too many requests. Please try again later.";

    if (typeof window !== "undefined") {
      void import("sonner")
        .then(({ toast }) => {
          toast.error(message);
        })
        .catch(() => {
          // noop
        });
    }

    throw new ApiError("RATE_LIMITED", message, 429);
  }

  if (payload && typeof payload === "object" && "error" in payload) {
    const error = (payload as ApiErrorResponse).error;
    throw new ApiError(
      error.code,
      error.message,
      response.status,
      error.details,
    );
  }

  throw new ApiError(
    "HTTP_ERROR",
    response.statusText || "Request failed",
    response.status,
  );
}

async function refreshAccessToken(): Promise<boolean> {
  if (typeof window === "undefined") {
    return false;
  }

  const response = await fetch(buildUrl(API_ROUTES.auth.refresh), {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    useAuthStore.getState().clearSession();
    return false;
  }

  const payload = await parseBody<{
    accessToken?: string;
    token?: string;
    user?: unknown;
  }>(response);
  const accessToken = payload.accessToken ?? payload.token;

  if (accessToken) {
    useAuthStore.getState().setAccessToken(accessToken);
    return true;
  }

  useAuthStore.getState().clearSession();
  return false;
}

async function request<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const {
    body,
    method = "GET",
    query,
    csrf = true,
    retryOnAuthFailure = true,
    ...init
  } = options;
  const headers = buildHeaders(init.headers, method, csrf);
  const hasBody = body !== undefined && body !== null;

  if (hasBody && !isFormData(body) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path, query), {
    ...init,
    method,
    credentials: "include",
    headers,
    body: hasBody
      ? isFormData(body)
        ? body
        : headers.get("Content-Type") === "application/json"
          ? JSON.stringify(body)
          : (body as BodyInit)
      : undefined,
  });

  if (response.status === 401 && retryOnAuthFailure) {
    const refreshed = await refreshAccessToken();

    if (refreshed) {
      return request<T>(path, { ...options, retryOnAuthFailure: false });
    }
  }

  return parseBody<T>(response);
}

export const apiClient = {
  get: <T>(path: string, options?: Omit<RequestOptions, "body" | "method">) =>
    request<T>(path, { ...options, method: "GET" }),
  post: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body" | "method">,
  ) => request<T>(path, { ...options, method: "POST", body }),
  patch: <T>(
    path: string,
    body?: unknown,
    options?: Omit<RequestOptions, "body" | "method">,
  ) => request<T>(path, { ...options, method: "PATCH", body }),
  delete: <T>(
    path: string,
    options?: Omit<RequestOptions, "body" | "method">,
  ) => request<T>(path, { ...options, method: "DELETE" }),
  upload: <T>(
    path: string,
    formData: FormData,
    options?: Omit<RequestOptions, "body">,
  ) =>
    request<T>(path, {
      ...options,
      method: options?.method ?? "POST",
      body: formData,
    }),
};
