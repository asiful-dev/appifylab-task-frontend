"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { authFeatureApi } from "@/features/auth/api/auth.api";
import { useAuthStore, type AuthUser } from "@/shared/libs/auth-store";

type AuthContextValue = {
  isReady: boolean;
};

const AuthContext = createContext<AuthContextValue>({ isReady: false });

type RefreshResponse = {
  accessToken?: string;
  token?: string;
  user?: AuthUser;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const setSession = useAuthStore((state) => state.setSession);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const clearSession = useAuthStore((state) => state.clearSession);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    let isMounted = true;

    async function silentRefresh() {
      setLoading(true);

      try {
        const response = await authFeatureApi.refresh<RefreshResponse>();
        const accessToken = response.accessToken ?? response.token;

        if (accessToken && response.user) {
          setSession(response.user, accessToken);
        } else if (accessToken) {
          setAccessToken(accessToken);
        } else {
          clearSession();
        }
      } catch {
        clearSession();
      } finally {
        if (isMounted) {
          setLoading(false);
          setIsReady(true);
        }
      }
    }

    void silentRefresh();

    return () => {
      isMounted = false;
    };
  }, [clearSession, setAccessToken, setLoading, setSession]);

  const value = useMemo(() => ({ isReady }), [isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
