"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { apiClient } from "@/utils";
import { useAuthStore, User } from "@/store/useAuthStore";

// Generic API Response wrapper returned by the backend
export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
  error: string | null;
}

// Login payloads and responses
export interface LoginPayload {
  email: string;
  password?: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  email: string;
  name: string;
  role: string;
}

export type LoginResponse = ApiResponse<LoginData>;

// Register payload
export interface RegisterPayload {
  email: string;
  name: string;
  password?: string;
}

export type RegisterResponse = ApiResponse<unknown>;

export function useLoginMutation() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<LoginResponse>("/api/Auth/login", payload);
      if (!response.success) {
        throw new Error(response.message || response.error || "Login failed");
      }
      return response;
    },
    onSuccess: (response) => {
      const data = response.data;
      if (!data || !data.accessToken) {
        throw new Error("No authorization token returned from the server.");
      }

      // Save to Zustand store (which also decodes and sets the user)
      setAuth(data.accessToken, data.refreshToken || "", {
        email: data.email,
        name: data.name,
        role: data.role,
      });
      
      // Clear previous query caches to avoid leaking data between users
      queryClient.clear();

      // Redirect user to dashboard
      router.replace("/dashboard");
    },
  });
}

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<RegisterResponse>("/api/Auth/register", payload);
      if (!response.success) {
        throw new Error(response.message || response.error || "Registration failed");
      }
      return response;
    },
    onSuccess: () => {
      // Redirect user to sign-in page
      router.push("/sign-in");
    },
  });
}

export function useUsersQuery() {
  const token = useAuthStore((state) => state.token);

  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<User[]>>("/api/Auth/users");
      if (!response.success) {
        throw new Error(response.message || response.error || "Failed to fetch users");
      }
      return response.data;
    },
    enabled: !!token, // Only run if authenticated
  });
}
