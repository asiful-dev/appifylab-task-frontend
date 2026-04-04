export function getCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(name.length + 1));
}

export function getCsrfToken(): string | null {
  const tokenFromCookie =
    getCookie("csrfToken") ||
    getCookie("XSRF-TOKEN") ||
    getCookie("_csrf") ||
    getCookie("csrf-token");

  if (tokenFromCookie) {
    return tokenFromCookie;
  }

  if (typeof document === "undefined") {
    return null;
  }

  const tokenFromMeta = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");

  return tokenFromMeta || null;
}
