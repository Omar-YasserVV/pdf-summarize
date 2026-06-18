"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
}

export function decodeJwt(token: string): User | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const parsed = JSON.parse(jsonPayload);

    // Support both standard JWT claims and typical ASP.NET Core identity claim schemas
    const email =
      parsed.email ||
      parsed.sub ||
      parsed["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const name =
      parsed.name ||
      parsed.unique_name ||
      parsed["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    const id =
      parsed.id ||
      parsed.nameid ||
      parsed["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    const role =
      parsed.role ||
      parsed["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    return { id, email, name, role };
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isHydrated: boolean;
  setAuth: (token: string, refreshToken: string, user?: User | null) => void;
  clearAuth: () => void;
  setHydrated: (status: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isHydrated: false,
      setAuth: (token, refreshToken, user = null) => {
        const decodedUser = user || decodeJwt(token);
        set({ token, refreshToken, user: decodedUser });
      },
      clearAuth: () => set({ token: null, refreshToken: null, user: null }),
      setHydrated: (status) => set({ isHydrated: status }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);
