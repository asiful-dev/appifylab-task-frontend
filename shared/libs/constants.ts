export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "BuddyScript";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export const APP_ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  feed: "/feed",
  profile: "/profile",
  profileEdit: "/profile/edit",
} as const;

export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  users: {
    base: "/users",
    me: "/users/me",
    avatar: "/users/me/avatar",
  },
  posts: {
    base: "/posts",
  },
  comments: {
    base: "/comments",
  },
} as const;
