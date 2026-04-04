import { create } from "zustand";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl?: string | null;
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (user: AuthUser, accessToken: string) => void;
  setUser: (user: AuthUser) => void;
  clearSession: () => void;
  setAccessToken: (accessToken: string | null) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: true,
  setSession: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true, isLoading: false }),
  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: state.isAuthenticated || Boolean(state.accessToken),
      isLoading: false,
    })),
  clearSession: () =>
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
    }),
  setAccessToken: (accessToken) =>
    set({ accessToken, isAuthenticated: Boolean(accessToken) }),
  setLoading: (isLoading) => set({ isLoading }),
}));
