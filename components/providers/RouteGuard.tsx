"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { token, isHydrated } = useAuthStore();

  const isAuthPage = pathname === "/sign-in" || pathname === "/sign-up";

  useEffect(() => {
    if (!isHydrated) return;

    if (token) {
      if (isAuthPage) {
        router.replace("/dashboard");
      }
    } else {
      if (!isAuthPage && pathname !== "/") {
        router.replace("/sign-in");
      }
    }
  }, [token, isHydrated, pathname, isAuthPage, router]);

  // Show a premium loading screen while Zustand hydrates from localStorage
  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
          <p className="text-sm text-cyan-400 tracking-wider font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of protected page content while redirecting unauthenticated users
  if (!token && !isAuthPage && pathname !== "/") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
          <p className="text-sm text-cyan-400 tracking-wider font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Prevent flash of auth page content while redirecting authenticated users
  if (token && isAuthPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f1e]">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent"></div>
          <p className="text-sm text-cyan-400 tracking-wider font-medium">Redirecting...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
